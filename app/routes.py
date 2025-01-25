from fastapi import APIRouter, HTTPException
from app.models import ChatRequest
from utils.gpt import GPTService

router = APIRouter()


@router.get("/")
async def check():
    """
    Endpoint to check if the service is running.
    """
    return {"Hello": "World"}


@router.post("/chat")
async def chat(request: ChatRequest):
    """
    Endpoint to handle chat requests.

    Args:
        request (ChatRequest): The chat request containing the encoded image, user prompt, and system prompt.

    Returns:
        dict: The response from the GPT service.

    Raises:
        HTTPException: Various HTTP exceptions based on the error encountered.
    """
    print("Received request:", request)
    try:
        gptClient = GPTService()

        response = gptClient.generateChatCompletion(
            encodedImage=request.encodedImage,
            userPrompt=request.userPrompt,
            systemPrompt=request.systemPrompt,
            chatHistory=request.chatHistory,
            maxHistoryWindow=5,
        )
        print("Response:", response)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
