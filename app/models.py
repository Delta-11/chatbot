from pydantic import BaseModel, Field
from typing import List, Union, Optional


class TextContent(BaseModel):
    type: str = Field(
        "text", title="Content Type", description="Type of the content, which is text."
    )
    text: Optional[str] = Field(None, title="Text", description="Text content.")


class ImageContent(BaseModel):
    type: str = Field(
        "image_url",
        title="Content Type",
        description="Type of the content, which is an image URL.",
    )
    image_url: Optional[dict] = Field(
        None, title="Image URL", description="Base64 encoded image URL."
    )


class Message(BaseModel):
    role: str = Field(
        ...,
        title="Role",
        description="Role of the message sender (e.g., system, user).",
    )
    content: List[Union[TextContent, ImageContent]] = Field(
        ..., title="Content", description="List of content items in the message."
    )


class ChatRequest(BaseModel):
    role: str = (
        Field(
            ...,
            title="Role",
            description="Role of the message sender (e.g. user and assistant only).",
        ),
    )
    systemPrompt: str = Field(
        "You are an AI assistant that helps people find information.",
        title="System Prompt",
        description="Instruction to the System.",
    )
    encodedImage: Optional[str] = Field(
        None,
        title="Encoded Image",
        description="Base64 encoded image URL. ex - data:image/png;base64,iVBORw0KGgoAAAANSU..",
    )
    userPrompt: str = (Field(..., title="User Prompt", description="User Query."),)
    chatHistory: List[Message] = Field(
        [], title="Chat History", description="List of previous chat messages."
    )
