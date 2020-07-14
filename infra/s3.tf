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
