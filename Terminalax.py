# -*- coding: utf-8 -*-
"""Untitled19.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1h3Q5xzG2Y0Xwo-ZYZS089kYF1LwV3mO4
"""

import subprocess
import sys
import os

# Define the packages to install
required_packages = ["llamaapi", "colorama", "termcolor", "pyfiglet"]

# Function to install packages
def install_packages():
    print("Installing required packages...")
    for package in required_packages:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

# Check and install the packages
install_packages()

# Imports after installation
import json
import shlex
from llamaapi import LlamaAPI
from colorama import init, Fore, Style
from termcolor import colored
import pyfiglet

# Initialize colorama
init(autoreset=True)

# Replace with your actual API key
llama = LlamaAPI("LL-Qig6k4VbqcY1vfjf14pJ4FkhsK5G13C8vhsWKsiekTBw10GA3aFW4YsQmzvrPN7d")

# Define dangerous commands and their descriptions
dangerous_commands = {
    "rm": "remove files or directories",
    "dd": "disk write operation",
    "mkfs": "format filesystem",
    "shutdown": "shutdown the system",
    "reboot": "reboot the system",
    # Add more as needed
}

# List of common Linux commands (not exhaustive)
linux_commands = [
    "ls", "cd", "pwd", "cp", "mv", "cat", "echo", "touch", "mkdir", "rmdir",
    "ps", "top", "kill", "grep", "find", "chmod", "chown", "ifconfig", "ping",
    "df", "du", "tar", "zip", "unzip", "nano", "vi", "wget", "curl"
]

def print_header():
    # Generate ASCII art with a hacker theme
    header = pyfiglet.figlet_format("Terminalax", font="slant")
    description = "Your ultimate terminal assistant with NLP and command execution."
    hacker_art = pyfiglet.figlet_format("Hack the Planet!", font="digital")

    print(colored(header, 'green', attrs=['bold']))
    print(colored(description, 'cyan'))
    print(colored(hacker_art, 'red', attrs=['bold']))

def prompt_to_command(prompt):
    """Converts a natural language prompt to a command using Llama API."""
    api_request_json = {
        "messages": [
            {"role": "user", "content": prompt},
            {"role": "assistant", "content": "Give only the command."}
        ],
        "stream": False
    }
    try:
        response = llama.run(api_request_json)
        response_data = response.json()
        if "choices" in response_data and len(response_data["choices"]) > 0:
            command = response_data["choices"][0]["message"]["content"]
            return command.strip()
        else:
            print(colored("No command generated.", 'red'))
            return None
    except Exception as e:
        print(colored(f"An error occurred: {e}", 'red'))
        return None

def confirm_and_execute(command):
    """Checks for dangerous commands and executes after user confirmation."""
    parts = shlex.split(command)
    base_command = parts[0]
    if base_command in dangerous_commands:
        confirmation = input(colored(f"Are you sure you want to execute this command: '{command}'? (yes/no): ", 'yellow')).strip().lower()
        if confirmation != 'yes':
            print(colored("Command aborted.", 'red'))
            return None
    return execute_command(command)

def execute_command(command):
    """Executes the given command and provides detailed feedback."""
    try:
        print(colored(f"Executing Command: {command}", 'green'))
        result = subprocess.run(command, shell=True, check=True, text=True, capture_output=True)
        print(colored(result.stdout, 'blue'))
        return True
    except subprocess.CalledProcessError as exec_error:
        print(colored(f"Execution Error: {exec_error}", 'red'))
        return False
    except Exception as e:
        print(colored(f"An unexpected error occurred: {e}", 'red'))
        return False

def main():
    print_header()
    print(colored("Type 'help' to list available commands or 'exit' to quit.", 'cyan'))
    while True:
        user_prompt = input(colored("Enter your prompt: ", 'cyan'))
        if user_prompt.lower() == 'exit':
            print(colored("Exiting...", 'green'))
            break
        elif user_prompt.lower() == 'help':
            print(colored("Available commands: ", 'cyan'))
            print(colored(", ".join(linux_commands), 'yellow'))
            continue

        command = prompt_to_command(user_prompt)
        if command:
            print(colored(f"Generated Command: {command}", 'magenta'))
            confirm_and_execute(command)
        else:
            print(colored("No command to execute.", 'red'))

if __name__ == "__main__":
    main()