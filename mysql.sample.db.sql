
--
-- База данных: `kmj`
--


SET CHARSET 'utf8';
SET GLOBAL time_zone = '+3:00';

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
(2, 'kazakovmj@yandex.ru', '11235813', 'super_admin', 'Maxim');

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE `clients` (
  `client_id` int(10) UNSIGNED NOT NULL,
  `fio` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `channel_id` int(10) UNSIGNED DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `clients`
--

INSERT INTO `clients` (`client_id`, `fio`, `phone`, `email`, `channel_id`, `location`, `description`, `status`, `created_at`) VALUES
(1, 'Омельченко Наталья', '8 (926) 317-3000', 'natika7823@mail.ru', 1, 'Рязанский проспект', '2 раза в неделю по 80 минут', NULL, '2017-11-24 17:19:25'),
(2, 'Хрусталева Инна Юрьевна', '8 (903) 108-3131', 'liberec31@mail.ru', 4, '', '', NULL, '2017-11-25 08:50:42');

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

--
-- Дамп данных таблицы `pupils`
--

INSERT INTO `pupils` (`pupil_id`, `fio`, `phone`, `email`, `class`, `school`, `status`, `client_id`) VALUES
(1, 'Стас Омельченко', '8 (985) 350-7757', 'wolf30011999@gmail.com', '11', 'Колледж связи 54', NULL, 1),
(2, 'Иван Хрусталев 3', '8 (909) 680-7494', 'i.khrustalyov@mail.ru', '11', '', NULL, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `pupil_groups`
--

CREATE TABLE `pupil_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL,
  `pupil_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pupil_groups`
--

INSERT INTO `pupil_groups` (`id`, `group_id`, `pupil_id`) VALUES
(1, 1, 1),
(2, 8, 2),
(3, 13, 2);

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
  `education` varchar(1234) DEFAULT NULL,
  `description` varchar(1234) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `fio`, `phone`, `email`, `age`, `education`, `description`) VALUES
(1, 'Казаков Максим Юрьевич', '+7 (929) 971-37-18', 'kazakovmj@yandex.ru', '31', 'Выпускник Комсомольского-на-Амуре государственного технического университета, кандидат технических наук.', 'Обладатель большого количества наград, дипломов и призовых мест в олимпиадах по математике, информатике и программированию, научный деятель, участник различных конференций и научных конкурсов.'),
(2, 'Воронцова Наталья Павловна', '8 (916) 923-35-94', '', '43', 'Харьковский государственный университет им. А.М. Горького (ХГУ)\nФилологический факультет\nРусский язык и литература с присвоением квалификации «Филолог. Преподаватель русского языка и литературы».\n17 лет работы на подготовительных курсах в филиале «Восход» МАИ на космодроме Байконур.\nНесколько лет сотрудничества с Санкт-Петербургским общественным фондом культуры и образования (преподавание на курсах по подготовке к поступлению в вузы Санкт-Петербурга).\n17 лет руководства работой городского МО (методобъединения) учителей-словесников.', 'Награды:\n1. Нагрудный знак «ОТЛИЧНИК ОБРАЗОВАНИЯ РЕСПУБЛИКИ КАЗАХСТАН»\n2. Почётная грамота МИНИСТЕРСТВА ОБЩЕГО И ПРОФЕССИОНАЛЬНОГО ОБРАЗОВАНИЯ РОССИЙСКОЙ ФЕДЕРАЦИИ\n3. Нагрудный знак «Почётный работник общего образования Российской Федерации».\nПовышение квалификации:\n1. Обучение на курсах повышения квалификации Педагогического университета «Первое сентября»\n2. Факультет педагогического образования МГУ им. М.В.Ломоносова по образовательной программе «Методика подготовки к ЕГЭ по русскому языку: планирование занятий, организация урока, система упражнений»'),
(3, 'Соханов Игорь Иванович', '8 (909) 816-59-15', '', '24', 'Выпускник Благовещенского государственного педагогического университета. Частный репетитор и преподаватель в колледже. 6 лет занимается подготовкой учащихся к сдаче ЕГЭ и ОГЭ по математике.', 'Обладатель призовых мест и звания победителя в конкурсах педагогического мастерства и олимпиадах по педагогике.\nРезультаты учеников: ОГЭ - 16-30 баллов; ЕГЭ - 62-84 балла.\n');

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `group_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `subject_id` int(10) UNSIGNED DEFAULT NULL,
  `daysOfWeek` json DEFAULT NULL,
  `teacher_id` int(10) UNSIGNED DEFAULT NULL,
  `format_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`group_id`, `title`, `subject_id`, `daysOfWeek`, `teacher_id`, `format_id`) VALUES
(1, 'Инф-1', 2, '[{\"day\": \"Четверг\", \"time\": \"18:00 - 20:50\"}]', 1, 1),
(2, 'Инф-2', 2, '[{\"day\": \"Пятница\", \"time\": \"18:00 – 20:50\"}]', 1, 1),
(3, 'Инф-3', 2, '[{\"day\": \"Воскресенье\", \"time\": \"14:30 – 16:30\"}]', 1, 2),
(4, 'Инф-4', 2, '[{\"day\": \"Воскресенье\", \"time\": \"16:40 – 18:40\"}]', 1, 2),
(5, 'Инф-5', 2, '[{\"day\": \"Четверг\", \"time\": \"16:30 – 17:50\"}]', 1, 3),
(6, 'Мат-1', 1, '[{\"day\": \"Понедельник\", \"time\": \"18:00 – 19:20\"}, {\"day\": \"Четверг\", \"time\": \"18:00 – 19:20\"}]', 3, 1),
(7, 'Мат-2', 1, '[{\"day\": \"Понедельник\", \"time\": \"16:30 – 17:50\"}, {\"day\": \"Четверг\", \"time\": \"16:30 – 17:50\"}]', 3, 1),
(8, 'Мат-3', 1, '[{\"day\": \"Вторник\", \"time\": \"18:00 – 20:50\"}]', 1, 1),
(9, 'Мат-4', 1, '[{\"day\": \"Среда\", \"time\": \"18:00 – 20:50\"}]', 1, 1),
(10, 'Мат-5', 1, '[{\"day\": \"Вторник\", \"time\": \"16:30 – 17:50\"}, {\"day\": \"Пятница\", \"time\": \"16:30 – 17:50\"}]', 1, 1),
(11, 'Мат-6', 1, '[{\"day\": \"Суббота\", \"time\": \"17:10 – 20:00\"}]', 1, 1),
(12, 'Рус-1', 3, '[{\"day\": \"Суббота\", \"time\": \"14:10 – 17:00\"}]', 2, 1),
(13, 'Рус-2', 3, '[{\"day\": \"Суббота\", \"time\": \"11:10 –14:00\"}]', 2, 1);

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
-- Структура таблицы `trainings`
--

CREATE TABLE `trainings` (
  `training_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL,
  `is_active` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `pupil_trainings`
--

CREATE TABLE `pupil_trainings` (
  `id` int(10) UNSIGNED NOT NULL,
  `pupil_id` int(10) UNSIGNED NOT NULL,
  `training_id` int(10) UNSIGNED NOT NULL,
  `tex` varchar(255) NOT NULL,
  `pupil_answer` varchar(255) NOT NULL,
  `right_answer` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Индексы таблицы `pupil_groups`
--
ALTER TABLE `pupil_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pupil_groups_pupil_id_index` (`pupil_id`),
  ADD KEY `pupil_groups_group_id_index` (`group_id`);

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
-- Индексы таблицы `trainings`
--
ALTER TABLE `trainings`
  ADD PRIMARY KEY (`training_id`),
  ADD KEY `trainings_subject_id_index` (`subject_id`);

--
-- Индексы таблицы `pupil_trainings`
--
ALTER TABLE `pupil_trainings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pupil_trainings_pupil_id_index` (`pupil_id`),
  ADD KEY `pupil_trainings_training_id_index` (`training_id`);


--
--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `pupils`
--
ALTER TABLE `pupils`
  MODIFY `pupil_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `pupil_groups`
--
ALTER TABLE `pupil_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT для таблицы `formats`
--
ALTER TABLE `formats`
  MODIFY `format_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT для таблицы `channels`
--
ALTER TABLE `channels`
  MODIFY `channel_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `trainings`
--
ALTER TABLE `trainings`
  MODIFY `training_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `pupil_trainings`
--
ALTER TABLE `pupil_trainings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;



--
-- Ограничения внешнего ключа таблицы `pupils`
--
ALTER TABLE `pupils`
  ADD CONSTRAINT `pupils_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE;
--
-- Ограничения внешнего ключа таблицы `pupil_groups`
--
ALTER TABLE `pupil_groups`
  ADD CONSTRAINT `pupil_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pupil_groups_pupil_id_foreign` FOREIGN KEY (`pupil_id`) REFERENCES `pupils` (`pupil_id`) ON DELETE CASCADE;
--
-- Ограничения внешнего ключа таблицы `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`),
  ADD CONSTRAINT `groups_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  ADD CONSTRAINT `groups_format_id_foreign` FOREIGN KEY (`format_id`) REFERENCES `formats` (`format_id`);
--
-- Ограничения внешнего ключа таблицы `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_channel_id_foreign` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`channel_id`) ON DELETE CASCADE;
--
-- Ограничения внешнего ключа сохраненных таблиц
--
ALTER TABLE `trainings`
  ADD CONSTRAINT `trainings_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE CASCADE;
--
-- Ограничения внешнего ключа таблицы `pupil_trainings`
--
ALTER TABLE `pupil_trainings`
  ADD CONSTRAINT `pupil_trainings_pupil_id_foreign` FOREIGN KEY (`pupil_id`) REFERENCES `pupils` (`pupil_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pupil_trainings_training_id_foreign` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`training_id`) ON DELETE CASCADE;
COMMIT;
