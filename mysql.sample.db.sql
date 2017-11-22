
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
  `channel_id` int(10) UNSIGNED NOT NULL,
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
  `groups` json DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `client_id` int(10) UNSIGNED NOT NULL
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
  `education` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `group_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL,
  `dayOfWeek` json DEFAULT NULL,
  `teacher_id` int(10) UNSIGNED NOT NULL,
  `time` varchar(255) DEFAULT NULL,
  `format_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `formats`
--

CREATE TABLE `formats` (
  `format_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `priceForCycle` varchar(255) NOT NULL,
  `countOfLessons` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `channels`
--

CREATE TABLE `channels` (
  `channel_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

