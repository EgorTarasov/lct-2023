import boto3

if __name__ == "__name__":
    s3_session = boto3.session.Session()
    s3 = s3_session.client(
            service_name="s3",
            endpoint_url="http://192.168.1.50:9000",
            aws_access_key_id="Pz54X5QLONq5trYEqSz5",
            aws_secret_access_key="Rv0wa7EGfSIadwFd5PfmspgExgRJik5vPqzaiCSs"
    )

    s3.put_object(Bucket='test', Key='object_name', Body='TEST')