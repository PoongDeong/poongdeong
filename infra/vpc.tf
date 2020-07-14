resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"

  tags = local.tags
}

resource "aws_default_network_acl" "acl" {
  default_network_acl_id = "${aws_vpc.vpc.default_network_acl_id}"
  subnet_ids = [
    "${aws_subnet.subnet1.id}",
    "${aws_subnet.subnet2.id}",
    "${aws_subnet.subnet3.id}",
  ]

  ingress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  ingress {
    protocol        = -1
    rule_no         = 101
    action          = "allow"
    ipv6_cidr_block = "::/0"
    from_port       = 0
    to_port         = 0
  }

  egress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  egress {
    protocol        = -1
    rule_no         = 101
    action          = "allow"
    ipv6_cidr_block = "::/0"
    from_port       = 0
    to_port         = 0
  }

  tags = local.tags
}

data "aws_route_table" "route-table" {
  vpc_id = "${aws_vpc.vpc.id}"
}

resource "aws_internet_gateway" "ig" {
  vpc_id = "${aws_vpc.vpc.id}"

  tags = local.tags
}

resource "aws_route" "public-route" {
  route_table_id         = "${data.aws_route_table.route-table.id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = "${aws_internet_gateway.ig.id}"
}


resource "aws_subnet" "subnet1" {
  vpc_id            = "${aws_vpc.vpc.id}"
  cidr_block        = "10.0.0.0/17"
  availability_zone = "ap-northeast-2a"

  tags = local.tags
}

resource "aws_subnet" "subnet2" {
  vpc_id            = "${aws_vpc.vpc.id}"
  cidr_block        = "10.0.128.0/18"
  availability_zone = "ap-northeast-2b"

  tags = local.tags
}

resource "aws_subnet" "subnet3" {
  vpc_id            = "${aws_vpc.vpc.id}"
  cidr_block        = "10.0.192.0/18"
  availability_zone = "ap-northeast-2c"

  tags = local.tags
}

resource "aws_security_group" "public-http" {
  vpc_id      = "${aws_vpc.vpc.id}"
  name        = "public-http"
  description = "Allow public HTTP and HTTPS"

  tags = local.tags

  ingress {
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    protocol         = "TCP"
    from_port        = 80
    to_port          = 80
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    protocol         = "TCP"
    from_port        = 443
    to_port          = 443
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_security_group" "public-ssh" {
  vpc_id      = "${aws_vpc.vpc.id}"
  name        = "public-ssh"
  description = "Allow public SSH"

  tags = local.tags

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
