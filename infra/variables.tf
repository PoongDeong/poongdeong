locals {
  name = "poongdeong"

  ecr_policy_arn = "arn:aws:iam::964037622278:policy/ecr-auth-policy"
  instance_type  = "t3a.micro"
  ami            = "ami-0e92198843e11ccee"

  bucket = "poongdeong.com"
  resourceBucket = "resource.poongdeong.com"
  redirectBucket = "www.poongdeong.com"

  web_acm_arn = "arn:aws:acm:us-east-1:964037622278:certificate/48a8d252-ddc6-4fee-9931-ffe1eb151b47"
  server_acm_arn = "arn:aws:acm:ap-northeast-2:964037622278:certificate/1d1e5c82-a1e7-4738-9d4f-1652128778c8"
  resource_acm_arn = "arn:aws:acm:us-east-1:964037622278:certificate/f5221db3-7420-4e42-8056-bff7bafc4aa8"

  tags = {
    env = "production"
    Name = "poongdeong"
  }
}
