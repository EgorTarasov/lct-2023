import boto3

if __name__ == "__name__":
    s3_session = boto3.session.Session()
    s3 = s3_session.client(
            service_name="s3",
            endpoint_url="",
            aws_access_key_id="",
            aws_secret_access_key=""
    )

    s3.put_object(Bucket='test', Key='object_name', Body='TEST')
