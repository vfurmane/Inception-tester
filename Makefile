# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: vfurmane <vfurmane@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2021/06/02 16:55:42 by vfurmane          #+#    #+#              #
#    Updated: 2021/06/08 17:05:35 by vfurmane         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

include Makefile.cfg

NAME	= node-testing

all:	build run

build:
		cp -rf $(PROJECT_DIRECTORY) project
		docker build -t $(NAME) .
		rm -rf project

run:
		docker run -it --network=$(NETWORK) $(NAME)

debug:	build
		docker run -it --network=$(NETWORK) $(NAME) npm run test:debug

clean:
ifneq ($(shell docker ps -aq -f "label=image=$(NAME)" | wc -l),0)
			docker stop $(shell docker ps -aq -f "label=image=$(NAME)")
			docker rm $(shell docker ps -aq -f "label=image=$(NAME)")
endif

fclean:		clean
ifneq ($(shell docker images | grep $(NAME) | wc -l),0)
			docker rmi $(NAME)
endif

re: 	fclean all

.PHONY: all $(NAME) clean fclean re
