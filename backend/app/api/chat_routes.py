from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import os
import openai
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

router = APIRouter()

# Initialize OpenAI client
try:
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        logger.error("OpenAI API key not found in environment variables")
except Exception as e:
    logger.error(f"Error initializing OpenAI client: {str(e)}")

class ChatMessage(BaseModel):
    message: str

# System message to set the context for the AI
SYSTEM_MESSAGE = """You are a helpful customer service assistant for an e-commerce website. 
You can help with:
- Product information and recommendations
- Order status and tracking
- Returns and refunds
- Shipping and delivery
- General customer support

Keep your responses concise, friendly, and focused on e-commerce topics.
When users ask about finding products, help them by:
1. Asking about their preferences (category, price range, etc.)
2. Suggesting how to use the search and filter features
3. Recommending popular products in their category of interest"""

@router.post("/chat")
async def chat(message: ChatMessage):
    try:
        if not openai.api_key:
            logger.warning("OpenAI API key not found, using fallback responses")
            return handle_basic_response(message.message)

        # Create chat completion with ChatGPT
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_MESSAGE},
                {"role": "user", "content": message.message}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        # Extract the AI's response
        ai_response = response.choices[0].message.content
        logger.info(f"ChatGPT response: {ai_response}")
        
        return {"response": ai_response}
    
    except Exception as e:
        logger.error(f"Error in ChatGPT API call: {str(e)}")
        return handle_basic_response(message.message)

def handle_basic_response(user_message: str):
    """Fallback function with basic responses if ChatGPT is unavailable"""
    user_message = user_message.lower()
    
    basic_responses = {
        "greetings": ["Hello! How can I help you today?", "Hi there! What can I do for you?"],
        "help": "I can help you with:\n- Finding products\n- Filtering by category\n- Price information\n- Order status\n- Returns and refunds",
        "price": "Our products range from ₹500 to ₹2000. You can use the price filter on the shop page to find products in your budget.",
        "return": "We offer a 30-day return policy. You can return any product in its original condition within 30 days of purchase.",
        "shipping": "We offer free shipping on orders above ₹1000. Standard delivery takes 3-5 business days.",
        "find": "To find products, you can:\n1. Use the search bar at the top\n2. Browse categories in the shop page\n3. Use filters for price, category, and more\n4. Check out our trending products section\n\nWhat type of products are you looking for? I can help you narrow down your search!",
        "trending": "Our trending products are the most popular items right now. You can find them by:\n1. Going to the Shop page\n2. Clicking on the 'Trending' filter\n3. Browsing through the featured products",
        "categories": "We have several product categories:\n1. Electronics\n2. Clothing\n3. Home & Kitchen\n4. Books\n5. Sports & Outdoors\n\nWhich category interests you?",
        "default": "I'm not sure I understand. Could you please rephrase your question? You can also type 'help' to see what I can assist you with."
    }
    
    # Check for greetings
    if any(word in user_message for word in ["hello", "hi", "hey"]):
        return {"response": basic_responses["greetings"][0]}
    
    # Check for help request
    if "help" in user_message:
        return {"response": basic_responses["help"]}
    
    # Check for price related questions
    if any(word in user_message for word in ["price", "cost", "expensive", "cheap"]):
        return {"response": basic_responses["price"]}
    
    # Check for return/refund questions
    if any(word in user_message for word in ["return", "refund", "exchange"]):
        return {"response": basic_responses["return"]}
    
    # Check for shipping/delivery questions
    if any(word in user_message for word in ["shipping", "delivery", "when will i get", "track"]):
        return {"response": basic_responses["shipping"]}
    
    # Check for product finding questions
    if any(word in user_message for word in ["find", "search", "look for", "where is", "where can i", "show me"]):
        return {"response": basic_responses["find"]}
    
    # Check for trending products
    if any(word in user_message for word in ["trending", "popular", "best selling"]):
        return {"response": basic_responses["trending"]}
    
    # Check for categories
    if any(word in user_message for word in ["category", "categories", "type", "kinds"]):
        return {"response": basic_responses["categories"]}
    
    # Check for numbers (like "4" in your example)
    if user_message.isdigit():
        return {"response": "I see you've entered a number. Could you please tell me what you're looking for? For example, you can say 'show me trending products' or 'what categories do you have?'"}
    
    # Default response
    return {"response": basic_responses["default"]} 