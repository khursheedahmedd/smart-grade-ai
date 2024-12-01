"""Console script for llama_ocr."""
import llama_ocr

import typer
from rich.console import Console

app = typer.Typer()
console = Console()


@app.command()
def main():
    """Console script for llama_ocr."""
    console.print("Replace this message by putting your code into "
               "llama_ocr.cli.main")
    console.print("See Typer documentation at https://typer.tiangolo.com/")
    


if __name__ == "__main__":
    app()
