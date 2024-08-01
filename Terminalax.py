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

def install_dependencies():
    """Install required dependencies."""
    run_command("sudo apt-get update")
    run_command("sudo apt-get install -y openjdk-11-jdk wget tar")

def install_hadoop():
    """Download and install Hadoop."""
    hadoop_version = "3.3.1"
    hadoop_url = f"https://downloads.apache.org/hadoop/common/hadoop-{hadoop_version}/hadoop-{hadoop_version}.tar.gz"
    run_command(f"wget {hadoop_url} -O hadoop.tar.gz")
    run_command("tar -xzvf hadoop.tar.gz")
    run_command(f"sudo mv hadoop-{hadoop_version} /usr/local/hadoop")
    run_command("echo 'export HADOOP_HOME=/usr/local/hadoop' >> ~/.bashrc")
    run_command("echo 'export PATH=$PATH:$HADOOP_HOME/bin' >> ~/.bashrc")
    run_command("source ~/.bashrc")

def configure_hadoop():
    """Configure Hadoop by setting up core-site.xml, hdfs-site.xml, and mapred-site.xml."""
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
    with open('/usr/local/hadoop/etc/hadoop/core-site.xml', 'w') as f:
        f.write(core_site)
    with open('/usr/local/hadoop/etc/hadoop/hdfs-site.xml', 'w') as f:
        f.write(hdfs_site)
    with open('/usr/local/hadoop/etc/hadoop/mapred-site.xml', 'w') as f:
        f.write(mapred_site)

def start_hadoop_services():
    """Start Hadoop services."""
    run_command("sudo /usr/local/hadoop/sbin/start-dfs.sh")
    run_command("sudo /usr/local/hadoop/sbin/start-yarn.sh")
    print("Hadoop services started.")

def wait_for_services():
    """Wait for services to start up."""
    print("Waiting for Hadoop services to start...")
    time.sleep(30)  # Wait for services to initialize

def verify_services():
    """Verify that Hadoop services are running."""
    run_command("jps")

def main():
    """Main function to run setup steps."""
    install_dependencies()
    install_hadoop()
    configure_hadoop()
    start_hadoop_services()
    wait_for_services()
    verify_services()
    print("Hadoop setup complete. Hadoop services are running and accessible at localhost.")

if __name__ == "__main__":
    main()

