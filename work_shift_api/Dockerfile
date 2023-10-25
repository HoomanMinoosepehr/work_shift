FROM ruby:3.0.2
RUN gem install rails

RUN mkdir /app
WORKDIR /app

ADD Gemfile Gemfile.lock /app

RUN gem install bundler
RUN bundle install

ADD . /app

# RUN rails webpacker:compile

# RUN rails webpacker:compile
CMD rm -f /app/tmp/pids/server.pid && rails db:create && rails db:migrate && rails s -b 0.0.0.0
EXPOSE 5050