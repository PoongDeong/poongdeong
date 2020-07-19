cd client
npm run build -- --mode=production
aws s3 cp dist s3://poongdeong.com --recursive --acl public-read
aws cloudfront create-invalidation --distribution-id E2XV363JB70FQ9 --paths "/"