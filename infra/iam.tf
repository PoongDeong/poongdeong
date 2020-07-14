resource "aws_iam_user" "server_uploader" {
  name = "${local.name}_server_uploader"
}

resource "aws_iam_access_key" "server_uploader_key" {
  user = aws_iam_user.server_uploader.name
}

resource "aws_iam_user" "server_downloader" {
  name = "${local.name}_server_downloader"
}

resource "aws_iam_access_key" "server_downloader_key" {
  user = aws_iam_user.server_downloader.name
}

resource "aws_iam_user" "resource_uploader" {
  name = "${local.name}-resource-uploader"
}

resource "aws_iam_access_key" "resource_uploader_key" {
  user = aws_iam_user.resource_uploader.name
}

data "aws_iam_policy" "ecr_auth_policy" {
  arn = local.ecr_policy_arn
}

resource "aws_iam_user_policy_attachment" "uploader_ecr_attach" {
  user       = aws_iam_user.server_uploader.name
  policy_arn = data.aws_iam_policy.ecr_auth_policy.arn
}

resource "aws_iam_user_policy_attachment" "downloader_ecr_attach" {
  user       = aws_iam_user.server_downloader.name
  policy_arn = data.aws_iam_policy.ecr_auth_policy.arn
}
