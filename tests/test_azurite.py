import pytest
from azure.storage.blob import BlobServiceClient

def test_azurite_connection():
    """Verify connection and container creation in Azurite emulator."""
    connect_str = (
        "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;"
        "AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZvxWq_2Y4Cxg_I_M_w_w--_w--_w--_w==;"
        "BlobEndpoint=http://azurite:10000/devstoreaccount1;"
    )
    try:
        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        container_name = "test-container"
        container_client = blob_service_client.create_container(container_name)
        assert container_client.exists()
        blob_service_client.delete_container(container_name)
    except Exception as e:
        pytest.fail(f"A conexão com o Azurite falhou: {e}")
