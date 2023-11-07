import os
import logging
import boto3
from botocore.exceptions import ClientError


def upload_file(s3_client, file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param s3_client: s3 client
    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True


def create_presigned_url(s3_client, bucket_name, object_name, expiration=3600):
    """Generate a presigned URL to share an S3 object

    :param s3_client: s3 client
    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.
    """

    # Generate a presigned URL for the S3 object
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response


if __name__ == "__main__":
    print(1)
    s3_session = boto3.session.Session()
    s3 = s3_session.client(
            service_name="s3",
            endpoint_url="http://localhost:9000",
            aws_access_key_id="QMmDKgOycRAGM6whjtR5",
            aws_secret_access_key="Bqj7qIXUnHrCTqTp4d8eYPFVdY6NZ0orKNNMAfLI"
    )
    s3.upload_fileobj()
    print(1)