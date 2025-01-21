import os
from dotenv import load_dotenv


class Config:
    _instance = None
    _config = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Config, cls).__new__(cls)
            cls._load_config()
        return cls._instance

    @classmethod
    def _load_config(cls):
        load_dotenv()
        cls._config = {
            "ENDPOINT_URL": os.getenv("ENDPOINT_URL"),
            "DEPLOYMENT_NAME": os.getenv("DEPLOYMENT_NAME"),
            "AZURE_OPENAI_API_KEY": os.getenv("AZURE_OPENAI_API_KEY"),
            "API_VERSION": os.getenv("API_VERSION"),
        }

    def get(self, key):
        return self._config.get(key)
