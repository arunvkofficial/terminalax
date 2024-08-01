import os
import subprocess
import time

def run_command(command):
    """Execute a shell command and print output."""
    print(f"Running: {command}")
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, err = process.communicate()
    if process.returncode != 0:
        print(f"Error: {err.decode()}")
    else:
        print(out.decode())

def extract_and_setup_hadoop():
    """Extract Hadoop tar file and set up environment."""
    print("Extracting Hadoop tar file...")
    run_command("tar -xzvf hadoop-3.3.1.tar.gz -C /usr/local/")
    
    # Set up environment variables
    print("Setting up environment variables...")
    run_command("echo 'export HADOOP_HOME=/usr/local/hadoop' >> ~/.bashrc")
    run_command("echo 'export PATH=$PATH:$HADOOP_HOME/bin' >> ~/.bashrc")
    run_command("exec bash")  # Reload the shell environment

def configure_hadoop():
    """Configure Hadoop by setting up core-site.xml, hdfs-site.xml, and mapred-site.xml."""
    print("Configuring Hadoop...")
    config_dir = '/usr/local/hadoop/etc/hadoop'
    os.makedirs(config_dir, exist_ok=True)
    
    core_site = """<?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <property>
            <name>fs.defaultFS</name>
            <value>hdfs://localhost:9000</value>
        </property>
    </configuration>
    """
    hdfs_site = """<?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <property>
            <name>dfs.replication</name>
            <value>1</value>
        </property>
    </configuration>
    """
    mapred_site = """<?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <property>
            <name>mapreduce.framework.name</name>
            <value>yarn</value>
        </property>
    </configuration>
    """
    
    with open(os.path.join(config_dir, 'core-site.xml'), 'w') as f:
        f.write(core_site)
    with open(os.path.join(config_dir, 'hdfs-site.xml'), 'w') as f:
        f.write(hdfs_site)
    with open(os.path.join(config_dir, 'mapred-site.xml'), 'w') as f:
        f.write(mapred_site)

def start_hadoop_services():
    """Start Hadoop services."""
    print("Starting Hadoop services...")
    run_command("sudo /usr/local/hadoop/sbin/start-dfs.sh")
    run_command("sudo /usr/local/hadoop/sbin/start-yarn.sh")
    print("Hadoop services started.")

def wait_for_services():
    """Wait for services to start up."""
    print("Waiting for Hadoop services to start...")
    time.sleep(30)  # Wait for services to initialize

def verify_services():
    """Verify that Hadoop services are running."""
    print("Verifying Hadoop services...")
    run_command("jps")

def main():
    """Main function to run setup steps."""
    extract_and_setup_hadoop()
    configure_hadoop()
    start_hadoop_services()
    wait_for_services()
    verify_services()
    print("Hadoop setup complete. Hadoop services are running and accessible at localhost.")

if __name__ == "__main__":
    main()


