# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: vfurmane <vfurmane@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2021/06/02 16:55:42 by vfurmane          #+#    #+#              #
#    Updated: 2021/06/04 14:05:59 by vfurmane         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME	= node-testing
NET		= --net=host

all:	build run

build:
		docker build -t $(NAME) .

run:
		docker run -it --network=inception_default $(NAME)

debug:	build
	docker run -it --network=inception_default $(NAME) npm run test:debug

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
