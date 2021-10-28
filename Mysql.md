# mysql 连接
1. 下载mysql8
2. 新建`my.ini`文件
```
[mysqld]

# 设置3306端口

port=3306

# 设置mysql的安装目录

basedir=D:\\mysql\\mysql-8.0.22-winx64

# 切记此处一定要用双斜杠\\，单斜杠这里会出错。

# 设置mysql数据库的数据的存放目录

datadir=D:\\mysql\\mysql-8.0.22-winx64\\Data
# 此处同上

# 允许最大连接数

max_connections=200

# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统

max_connect_errors=10

# 服务端使用的字符集默认为UTF8

character-set-server=utf8

# 创建新表时将使用的默认存储引擎

default-storage-engine=INNODB

# 默认使用“mysql_native_password”插件认证

default_authentication_plugin=mysql_native_password

[mysql]

# 设置mysql客户端默认字符集

default-character-set=utf8

[client]

# 设置mysql客户端连接服务端时默认使用的端口

port=3306

default-character-set=utf8
```
3. 执行`mysqld --initialize --console`初始化，会生成数据库初始密码:Jcvpy;=f1mUZ(每次都不一样)
```
root@localhost: Jcvpy;=f1mUZ
```
若忘记了初始密码，可以删除data文件夹，再次执行`mysqld --initialize --console`会再重新生成。  
4. 执行`mysqld --install`  
5. 执行命令`net start mysql`，启动服务  
6. 登录修改密码  
* 服务启动成功后，输入`mysql -u root -p` 回车，在password后面输入刚才记下来的初始密码 
* 执行：`alter user root@localhost identified by '123456'`;  
7. 连接 ，我用的是`DataGrip 2020.2.3 x64`