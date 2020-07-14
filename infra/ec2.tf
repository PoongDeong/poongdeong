resource "aws_key_pair" "server_key" {
  key_name   = "${local.name}_server_key"
  public_key = "${file("~/.ssh/id_rsa.pub")}"
}

resource "aws_network_interface" "eni" {
  subnet_id = "${aws_subnet.subnet1.id}"
  security_groups = [
    aws_security_group.public-http.id,
    aws_security_group.public-ssh.id
  ]

  tags = local.tags
}

resource "aws_eip" "eip" {
  network_interface = aws_network_interface.eni.id

  tags = local.tags
}

resource "aws_instance" "ec2" {
  ami           = "${local.ami}"
  instance_type = "${local.instance_type}"

  tags = local.tags

  key_name = "${aws_key_pair.server_key.key_name}"

  network_interface {
    network_interface_id = "${aws_network_interface.eni.id}"
    device_index         = 0
  }

  root_block_device {
    volume_type = "gp2"
    volume_size = 8
  }
}

resource "aws_lb" "lb" {
  name               = "${local.name}-server-lb"
  load_balancer_type = "application"

  tags     = local.tags
  internal = false

  subnets = [
    "${aws_subnet.subnet1.id}",
    "${aws_subnet.subnet2.id}",
    "${aws_subnet.subnet3.id}"
  ]

  security_groups = [
    "${aws_security_group.public-http.id}",
  ]

  enable_deletion_protection = true
}

resource "aws_lb_target_group" "tg" {
  name        = "${local.name}-server-tg"
  vpc_id      = "${aws_vpc.vpc.id}"
  target_type = "instance"
  protocol    = "HTTP"
  port        = 80

  tags = local.tags
}

resource "aws_lb_target_group_attachment" "tg-attach" {
  target_group_arn = "${aws_lb_target_group.tg.arn}"
  target_id        = "${aws_instance.ec2.id}"
  port             = 80
}

resource "aws_lb_listener" "lb-http-listener" {
  load_balancer_arn = "${aws_lb.lb.arn}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "lb-https-listener" {
  load_balancer_arn = "${aws_lb.lb.arn}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "${local.server_acm_arn}"

  default_action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.tg.arn}"
  }
}


