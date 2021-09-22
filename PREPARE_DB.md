# Create Database Instruction
    sudo -u postgres psql

    ## Check databases & users ##
    \l
    \du
    
    ### !!! FIXME password on prod !!! ###
    CREATE DATABASE simple_blank_project;
    CREATE USER simple_blank_project WITH ENCRYPTED PASSWORD 'qweqwe';        
    GRANT ALL PRIVILEGES ON DATABASE simple_blank_project TO simple_blank_project;
    
    \q
