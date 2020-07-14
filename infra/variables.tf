locals {
  ecr_policy_arn = "arn:aws:iam::964037622278:policy/ecr-auth-policy"
  instance_type  = "t3a.micro"
  ami            = "ami-0e92198843e11ccee"
  name = "poongdeong"
  bucket = "poongdeong.com"
  server_acm_arn = "arn:aws:acm:ap-northeast-2:964037622278:certificate/1d1e5c82-a1e7-4738-9d4f-1652128778c8"
  web_acm_arn = ""
  tags = {
    env = "production"
    Name = "poongdeong"
  }
}
