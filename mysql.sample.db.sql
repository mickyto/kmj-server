
--
-- База данных: `kmj`
--


SET CHARSET 'utf8';

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `role`, `login`) VALUES
(1, 'egayi@yandex.ru', '12121212', 'super_admin', 'Igor'),
(2, 'kazakovmj@yandex.ru', '11235813', 'super_admin', 'Maximka');

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE `clients` (
  `client_id` int(10) UNSIGNED NOT NULL,
  `fio` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `channel_id` int(10) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `pupils`
--

CREATE TABLE `pupils` (
  `pupil_id` int(10) UNSIGNED NOT NULL,
  `fio` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `client_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `pupil_group`
--

CREATE TABLE `pupil_group` (
  `id` int(10) UNSIGNED NOT NULL,
  `pupil_id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(10) UNSIGNED NOT NULL,
  `fio` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `education` varchar(500) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `fio`, `phone`, `email`, `age`, `education`, `description`) VALUES
(1, 'Казаков Максим Юрьевич', '+7 (929) 971-37-18', 'kazakovmj@yandex.ru', '31', 'Выпускник Комсомольского-на-Амуре государственного технического университета, кандидат технических наук.', 'Обладатель большого количества наград, дипломов и призовых мест в олимпиадах по математике, информатике и программированию, научный деятель, участник различных конференций и научных конкурсов.');

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `group_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `subject_id` int(10) UNSIGNED DEFAULT NULL,
  `dayOfWeek` json DEFAULT NULL,
  `teacher_id` int(10) UNSIGNED DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `format_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `formats`
--

CREATE TABLE `formats` (
  `format_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `priceForCycle` varchar(255) DEFAULT NULL,
  `countOfLessons` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `formats`
--

INSERT INTO `formats` (`format_id`, `title`, `priceForCycle`, `countOfLessons`, `duration`) VALUES
(1, '2 раза в неделю по 80 минут', '7500', '8', '80 минут'),
(2, '1 раз в неделю по 120 минут', '6000', '4', '120 минут'),
(3, '1 раз в неделю по 80 минут', '4500', '4', '80 минут');

-- --------------------------------------------------------

--
-- Структура таблицы `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `subjects`
--

INSERT INTO `subjects` (`subject_id`, `name`) VALUES
(1, 'Математика'),
(2, 'Информатика'),
(3, 'Русский язык'),
(4, 'Обществознание'),
(5, 'История'),
(6, 'Химия'),
(7, 'Физика'),
(8, 'Английский');

-- --------------------------------------------------------

--
-- Структура таблицы `channels`
--

CREATE TABLE `channels` (
  `channel_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `channels`
--

INSERT INTO `channels` (`channel_id`, `name`) VALUES
(1, 'proof.ru'),
(2, 'iq-centr.ru'),
(3, 'Звонок'),
(4, 'Сарафанка');

-- --------------------------------------------------------

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Индексы таблицы `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`),
  ADD KEY `clients_channel_id_index` (`channel_id`);

--
-- Индексы таблицы `pupils`
--
ALTER TABLE `pupils`
  ADD PRIMARY KEY (`pupil_id`),
  ADD KEY `pupils_client_id_index` (`client_id`);

--
-- Индексы таблицы `pupil_group`
--
ALTER TABLE `pupil_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pupil_group_pupil_id_group_id_unique` (`pupil_id`,`group_id`),
  ADD KEY `pupil_group_group_id_foreign` (`group_id`);

--
-- Индексы таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`);

--
-- Индексы таблицы `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `groups_subject_id_index` (`subject_id`),
  ADD KEY `groups_teacher_id_index` (`teacher_id`),
  ADD KEY `groups_format_id_index` (`format_id`);

--
-- Индексы таблицы `formats`
--
ALTER TABLE `formats`
  ADD PRIMARY KEY (`format_id`);

--
-- Индексы таблицы `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`);

--
-- Индексы таблицы `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`channel_id`);

--
--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `category_property`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT для таблицы `default_values`
--
ALTER TABLE `pupils`
  MODIFY `pupil_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT для таблицы `category_property`
--
ALTER TABLE `pupil_group`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT для таблицы `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT для таблицы `measures`
--
ALTER TABLE `formats`
  MODIFY `format_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT для таблицы `properties`
--
ALTER TABLE `channels`
  MODIFY `channel_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

