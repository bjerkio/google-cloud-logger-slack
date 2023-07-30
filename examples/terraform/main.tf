provider "google" {
  project = "the-project-id"
  region  = "europe-west1"
}

resource "google_pubsub_topic" "topic" {
  name = "slack-logger"
}

resource "google_service_account" "service_account" {
  account_id = "slack-logger"
}

resource "google_cloud_run_service" "service" {
  name        = "slack-logger-slack-logger"
  location    = "europe-west1"
  description = "Slack logger – slack-logger"

  template {
    spec {
      service_account_name = google_service_account.service_account.email

      container {
        image = "ghcr.io/bjerkio/google-cloud-logger-slack:v3.1.0"

        env {
          name  = "SLACK_TOKEN"
          value = var.bot_oauth_token
        }

        env {
          name  = "DEFAULT_CHANNEL"
          value = "a-channel"
        }
      }
    }
  }
}

resource "google_eventarc_trigger" "trigger" {
  name        = "slack-logger"
  location    = "europe-west1"
  service_account = google_service_account.service_account.email

  event_filter {
    attribute = "type"
    value     = "google.cloud.pubsub.topic.v1.messagePublished"
  }

  transport {
    pubsub {
      topic = google_pubsub_topic.topic.name
    }
  }

  destination {
    cloud_run {
      service = google_cloud_run_service.service.name
      region  = "europe-west1"
    }
  }
}

resource "google_project_iam_member" "event_receiver" {
  project = "the-project-id"
  role    = "roles/eventarc.eventReceiver"
  member  = "serviceAccount:${google_service_account.service_account.email}"
}

resource "google_cloud_run_service_iam_member" "run_invoker" {
  location = "europe-west1"
  name     = google_cloud_run_service.service.name
  role     = "roles/run.invoker"
  member   = "serviceAccount:${google_service_account.service_account.email}"
}

resource "google_logging_project_sink" "log_sink" {
  name = "slack-logger"
  filter = "operation.producer=\"github.com/bjerkio/google-cloud-logger-slack@v1\""
  destination = "pubsub.googleapis.com/${google_pubsub_topic.topic.id}"
}

resource "google_pubsub_topic_iam_member" "topic_publisher" {
  topic = google_pubsub_topic.topic.name
  role  = "roles/pubsub.publisher"
  member = google_logging_project_sink.log_sink.writer_identity
}