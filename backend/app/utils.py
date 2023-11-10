import asyncio
import mammoth
import aiofiles


async def docx_to_markdown_async(docx_content: bytes):
    """ """
    async with aiofiles.open("tmp.docx", "wb") as file:
        await file.write(docx_content)
    # Convert to Markdown
    with open("tmp.docx", "rb") as file:
        result = mammoth.convert_to_markdown(file)
        markdown = result.value
        messages = result.messages
        print("markdown", markdown)
        return markdown
