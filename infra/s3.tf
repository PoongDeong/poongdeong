resource "aws_s3_bucket" "bucket" {
  bucket = local.bucket
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "MYBUCKETPOLICY",
  "Statement": [
    {
      "Sid": "UploadAllow",
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "${aws_iam_user.resource_uploader.arn}"
        ]
      },
      "Action": [
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::${local.bucket}/*"
    }
  ]
}
POLICY
}

resource "aws_s3_bucket" "redirect_bucket" {
  bucket = local.redirectBucket
  acl    = "private"

  website {
    redirect_all_requests_to = local.bucket
  }
}

resource "aws_s3_bucket" "resource-bucket" {
  bucket = local.resourceBucket
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["https://poongdeong.com", "http://localhost:8080"]
    max_age_seconds = 3000
  }

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "MYBUCKETPOLICY",
  "Statement": [
    {
      "Sid": "GetAllow",
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "${aws_iam_user.resource_user.arn}"
        ]
      },
      "Action": [
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::${local.resourceBucket}/*"
    }
  ]
}
POLICY
}
