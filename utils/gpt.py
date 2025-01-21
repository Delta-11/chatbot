from openai import AzureOpenAI
from utils.envLoader import Config
from app.models import TextContent, ImageContent, Message, Optional, List


class GPTService:
    def __init__(self):
        config = Config()
        self.endpoint = config.get("ENDPOINT_URL")
        self.deployment_name = config.get("DEPLOYMENT_NAME")
        self.api_key = config.get("AZURE_OPENAI_API_KEY")
        self.api_version = config.get("API_VERSION")

        # Initialize Azure OpenAI Service client with key-based authentication
        self.client = AzureOpenAI(
            azure_endpoint=self.endpoint,
            api_key=self.api_key,
            api_version=self.api_version,
        )

    def generateChatCompletion(
        self,
        encodedImage: Optional[str] = None,
        userPrompt: Optional[str] = None,
        systemPrompt: str = None,
        chatHistory: List[Message] = [],
        maxHistoryWindow: int = 5,
    ) -> str:
        """
        Generates a chat completion using Azure OpenAI Service.

        Args:
            encodedImage (Optional[str]): Base64 encoded image URL. Defaults to None.
            userPrompt (Optional[str]): Text content from the user. Defaults to None.
            systemPrompt (str): Text content from the system. Defaults to a predefined message.
            chatHistory (List[Message]): List of previous chat messages. Defaults to an empty list.
            maxHistoryWindow (int): Maximum number of user-assistant pairs to include in the prompt. Defaults to 5.

        Returns:
            str: JSON string of the completion result.
        """
        content = []
        if userPrompt:
            content.append(TextContent(text=userPrompt))
        if encodedImage:
            content.append(ImageContent(image_url={"url": encodedImage}))

        # Check if the system message already exists in the chat history
        if not any(message.role == "system" for message in chatHistory):
            chatHistory.insert(
                0, Message(role="system", content=[TextContent(text=systemPrompt)])
            )

        # Include the latest maxHistoryWindow pairs of user and assistant messages
        chat_prompt = chatHistory[-maxHistoryWindow * 2 :]
        chat_prompt.append(Message(role="user", content=content))

        # Generate the completion
        completion = self.client.chat.completions.create(
            model=self.deployment_name,
            messages=[message.dict() for message in chat_prompt],
            max_tokens=800,
            temperature=0.7,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None,
            stream=False,
        )

        response = completion.choices[0].message.content
        assistant_message = Message(
            role="assistant", content=[TextContent(text=response)]
        )
        # Add the assistant response to the chat history
        chatHistory.append(Message(role="user", content=content))
        chatHistory.append(assistant_message)

        # Return the updated chat history
        return chatHistory
