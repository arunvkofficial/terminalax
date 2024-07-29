import subprocess
import shlex
import os
import json
import sys

# Define required packages
required_packages = ["paramiko", "llamaapi", "colorama", "termcolor", "pyfiglet"]

def install_packages(packages):
    """Install required packages."""
    for package in packages:
        try:
            __import__(package)
        except ImportError:
            print(f"Package {package} not found. Installing...")
            try:
                subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            except subprocess.CalledProcessError as e:
                print(f"Failed to install package {package}: {e}")
                sys.exit(1)  # Exit if installation fails

# Install required packages
install_packages(required_packages)

# Import after installation
try:
    import paramiko
    from llamaapi import LlamaAPI
    from colorama import init, Fore, Style
    from termcolor import colored
    import pyfiglet
except ImportError as e:
    print(f"Error importing installed packages: {e}")
    sys.exit(1)

# Initialize colorama
init(autoreset=True)

# Replace with your actual API key
llama = LlamaAPI("LL-Qig6k4VbqcY1vfjf14pJ4FkhsK5G13C8vhsWKsiekTBw10GA3aFW4YsQmzvrPN7d")

# Keep track of the command history
command_history = []
current_directory = os.getcwd()

# Define dangerous commands and their descriptions
dangerous_commands = {
    "rm": "Remove files or directories",
    "dd": "Disk write operation",
    "mkfs": "Format filesystem",
    "shutdown": "Shutdown the system",
    "reboot": "Reboot the system",
}

def print_header():
    """Print the header with ASCII art and description."""
    header = pyfiglet.figlet_format("Terminalax AI", font="slant")
    description = "Advanced AI Terminal with NLP and Command Execution."
    hacker_art = pyfiglet.figlet_format("Hack the Planet!", font="digital")
    
    print(colored(header, 'green', attrs=['bold']))
    print(colored(description, 'cyan'))
    print(colored(hacker_art, 'red', attrs=['bold']))

def prompt_to_command(prompt):
    """Convert a natural language prompt to a command using Llama API."""
    api_request_json = {
        "messages": [
            {"role": "user", "content": prompt},
            {"role": "assistant", "content": "Provide only the command with accurate syntax."}
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
            print(colored("No command generated. Please refine your input.", 'red'))
            return None
    except Exception as e:
        print(colored(f"Error in NLP processing: {e}", 'red'))
        return None

def confirm_and_execute(command):
    """Check for dangerous commands and execute after user confirmation."""
    parts = shlex.split(command)
    base_command = parts[0]
    if base_command in dangerous_commands:
        confirmation = input(colored(f"Warning: '{command}' is a dangerous command. Do you wish to proceed? (yes/no): ", 'yellow')).strip().lower()
        if confirmation != 'yes':
            print(colored("Command execution aborted.", 'red'))
            return None
    return execute_command(command)

def execute_command(command):
    """Execute the given command and provide detailed feedback."""
    global current_directory
    try:
        parts = shlex.split(command)
        
        if parts[0] == "cd":
            if len(parts) > 1:
                new_directory = parts[1]
                if os.path.isdir(new_directory):
                    current_directory = os.path.abspath(new_directory)
                    os.chdir(current_directory)
                    print(colored(f"Changed directory to: {current_directory}", 'green'))
                else:
                    print(colored(f"Directory '{new_directory}' does not exist.", 'red'))
            return True
        
        print(colored(f"Executing Command: {command}", 'green'))
        result = subprocess.run(command, shell=True, check=True, text=True, capture_output=True, cwd=current_directory)
        if result.stdout:
            print(colored(result.stdout, 'blue'))
        if result.stderr:
            print(colored(result.stderr, 'red'))
        command_history.append(command)
        return True
    except subprocess.CalledProcessError as exec_error:
        print(colored(f"Execution Error: {exec_error}", 'red'))
        if exec_error.stderr:
            print(colored(exec_error.stderr, 'red'))
        return False
    except Exception as e:
        print(colored(f"Unexpected error occurred: {e}", 'red'))
        return False

def ssh_connect(host, port, username, password):
    """Establish an SSH connection and execute commands."""
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(host, port=port, username=username, password=password)
        print(colored(f"Connected to {host} on port {port}.", 'green'))
        return ssh
    except paramiko.AuthenticationException:
        print(colored("Authentication failed, please verify your credentials.", 'red'))
    except paramiko.SSHException as e:
        print(colored(f"Unable to establish SSH connection: {e}", 'red'))
    except Exception as e:
        print(colored(f"Unexpected error occurred: {e}", 'red'))
    return None

def ssh_execute_command(ssh, command):
    """Execute a command on the remote server via SSH."""
    try:
        stdin, stdout, stderr = ssh.exec_command(command)
        output = stdout.read().decode()
        error = stderr.read().decode()
        if output:
            print(colored(output, 'blue'))
        if error:
            print(colored(error, 'red'))
    except Exception as e:
        print(colored(f"Error executing command over SSH: {e}", 'red'))

def provide_help(command):
    """Provide help and documentation for a command."""
    try:
        print(colored(f"Fetching help for command: {command}", 'cyan'))
        result = subprocess.run(f"man {command}", shell=True, check=True, text=True, capture_output=True)
        if result.stdout:
            print(colored(result.stdout, 'blue'))
        if result.stderr:
            print(colored(result.stderr, 'red'))
    except subprocess.CalledProcessError:
        print(colored(f"No manual entry for {command}", 'red'))

def handle_command(command):
    """Handle both local and SSH commands."""
    if command.lower().startswith('ssh'):
        # Example: ssh <host> <port> <username> <password>
        _, host, port, username, password = command.split()
        port = int(port)
        ssh = ssh_connect(host, port, username, password)
        if ssh:
            while True:
                ssh_command = input(colored(f"Enter SSH command for {host}: ", 'cyan'))
                if ssh_command.lower() == 'exit':
                    ssh.close()
                    print(colored("SSH connection closed.", 'green'))
                    break
                ssh_execute_command(ssh, ssh_command)
        return

    if command.lower() == 'history':
        print(colored("Command History:", 'cyan'))
        for idx, cmd in enumerate(command_history):
            print(colored(f"{idx + 1}: {cmd}", 'yellow'))
        return

    if command.lower().startswith('help'):
        _, cmd_help = command.split(maxsplit=1)
        provide_help(cmd_help)
        return

    command = prompt_to_command(command)
    if command:
        print(colored(f"Generated Command: {command}", 'magenta'))
        confirm_and_execute(command)
    else:
        print(colored("Failed to generate a command. Please try again.", 'red'))

def main():
    print_header()
    print(colored("Enter your commands or type 'exit' to quit.", 'cyan'))

    while True:
        user_prompt = input(colored("Enter your prompt: ", 'cyan'))
        if user_prompt.lower() == 'exit':
            print(colored("Exiting... Goodbye!", 'green'))
            break
        handle_command(user_prompt)

if __name__ == "__main__":
    main()
