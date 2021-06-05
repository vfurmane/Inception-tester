# Inception Tester

This repo provides tests suite for the **Inception** project @42Paris. These tests were written using the JavaScript Jest framework.

## Installation

First, clone this repo anywhere.

```shell
git clonse https://github.com/vfurmane/Inception-tester
```

## Configuration

Before using the tester, you will need to configure it.

```shell
./configure
```

You will be prompted some information, like the docker network, the MariaDB credentials, ...

## Usage

Once the configuration is done, and that your docker-compose is up, you can test your project by running the `make` command.

```shell
make
```

## Troubleshooting

### Makefile.cfg: No such file or directory

Have you done the configuration correctly ?

### No test work

Is your docker-compose up ? If yes, well, either my tests are not good enough or you have a problem with your project.
