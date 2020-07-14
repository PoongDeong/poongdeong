resource "aws_ecr_repository" "server_ecr" {
  name = "${local.name}-server"
}

resource "aws_ecr_repository_policy" "server_ecr_policy" {
  repository = aws_ecr_repository.server_ecr.name

  policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "new policy",
            "Effect": "Allow",
            "Principal": {
              "AWS": [
                "${aws_iam_user.server_uploader.arn}"
              ]
            },
            "Action": [
              "ecr:InitiateLayerUpload",
              "ecr:UploadLayerPart",
              "ecr:CompleteLayerUpload",
              "ecr:BatchCheckLayerAvailability",
              "ecr:PutImage"
            ]
        },
        {
            "Sid": "download policy",
            "Effect": "Allow",
            "Principal": {
              "AWS": [
                "${aws_iam_user.server_downloader.arn}"
              ]
            },
            "Action": [
              "ecr:BatchGetImage",
              "ecr:GetDownloadUrlForLayer",
              "ecr:GetAuthorizationToken"
            ]
        }
    ]
}
EOF
}
