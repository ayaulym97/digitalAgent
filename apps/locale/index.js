import LocalizedStrings from "react-native-localization";
import ru from "./ru";
import kz from "./kk";
import en from "./en";
const strings = new LocalizedStrings({
  ru: {
    search: "Поиск",
    footer: "Все права защищены.",
    yes: "Да",
    no: "Нет",
    send_btn_txt: "Отправить",
    back: "Вернуться",
    tutorial: {
      page_first: {
        header: "Организация",
        content: "Выберите город и организацию, которую хотите оценить."
      },
      page_second: {
        header: "Оценка",
        content:
          "Оцените качество обслуживания и оставьте комментарий или жалобу."
      },
      page_third: {
        header: "Звонок",
        content:
          "Дождитесь обратной связи в течение 5 минут и получите решение."
      },
      button: {
        next: "Далее",
        done: "Приступить"
      }
    },
    sign_up: {
      header: "Регистрация",
      error: "Вы ввели недопустимый номер",
      placeholder_text: "Телефон",
      send_btn_txt: "Отправить",
      oferta: {
        read_oferta_1: "Прочитайте оферту.",
        read_oferta_2: "Входя в приложение,вы",
        read_oferta_3: "принимаете ее условия.",
        read_oferta_4: "Просто и понятно об условиях.",
        agree_with_oferta:
          "Даю согласие на получение рекламы в соответствии с Офертой."
      }
    },
    codeConfirm: {
      header: "Введите SMS код",
      code_sent: "Код отправлен на номер:",
      repeat_sms_code: "Повторно отправить SMS",
      send_btn_txt: "Отправить",
      error: {
        error_1: "Код неверный.",
        error_2: "Ввести код еще раз"
      }
    },
    select_vedom: {
      header: "Выберите ведомство",
      service_center: "ЦОНы",
      ministry_of_labor: "Министерство труда и социальной защиты",
      ministry_of_finance: "Министерство финансов"
    },
    select_region: {
      header: "Выберите регион"
    },
    select_district: {
      header: "Выберите район"
    },
    select_institute: {
      header: "Выберите учреждение"
    },
    estimate: {
      header: "Оцените учреждение",
      category:"Выберите категорию",
      disappoint: "Что именно разочаровало?",
      do_not_like: "Что именно не понравилось?",
      staff: "Некомпетентность персонала",
      queue: "Время ожидания в очереди",
      room: "Ужасные условия в зале ожидания",
      invalid: "Отсутствие условий для лиц с ограниченными возможностями",
      comment: "Комментарий",
      placeholder_txt: "Ваше мнение",
      attach_photo: "Прикрепите фотографию",
      send_btn_txt: "Отправить"
    },
    wait_5_minute: {
      header: "Ваша жалоба принята!",
      content:
        " Пожалуйста, дождитесь звонка от услугодателя. Жалоба направлена в ситуационный центр.",
      called: "Вам позвонили?",
      solved_problem: "Решили вопрос?",
      yes: "Да",
      no: "Нет"
    },
    after_eight_pm: {
      header:
        "Спасибо, Ваша заявка принята, с Вами обязательно свяжутся в течение рабочего времени"
    },
    called: {
      header: "Спасибо,что воспользовались приложением!"
    },
    uncalled: {
      header: "Ваша жалоба отправлена!",
      content:
        "В Агентство Республики Казахстан по делам государственной службы и противодействию коррупции(",
      content_1: "АДГСПК РК",
      content_2:
        "Результат Вашей жалобы будет известен после проверки учреждение.",
      back_to_main_page: "Вернуться на главную"
    },
    wanna_be_connected: {
      thanks: "Спасибо,",
      subheader: "что оценили нашу работу!",
      wanna_be_contacted: "Вы хотите, чтобы с Вами связались?",
      yes: "Да",
      no: "Нет"
    },

    example:"Кондиционирование2"
  },

  kz: {
    search: "Іздеу",
    footer: "Барлық құқықтар сақталған",
    yes: "Иә",
    no: "Жоқ",
    send_btn_txt: "Жіберу",

    back: "Қайту",
    tutorial: {
      page_first: {
        header: "Ұйым",
        content: "Бағаланғыңыз келетін қаланы және ұйымды таңдаңыз."
      },
      page_second: {
        header: "Бағалау",
        content:
          "Қызмет көрсету сапасын бағалаңыз және түсініктеме немесе шағым қалдырыңыз."
      },
      page_third: {
        header: "Қоңырау шалу",
        content: "5 минут ішінде кері байланысты күтіп, шешім алыңыз."
      },
      button: {
        next: "Келесі",
        done: "Бастау"
      }
    },

    sign_up: {
      header: "Тіркелу",
      error: "Қолжетімсіз нөмірді енгіздіңіз",
      placeholder_text: "Телефон",
      send_btn_txt: "Жіберу",
      oferta: {
        read_oferta_1: "Ұсынысты оқыңыз.",
        read_oferta_2: "Қосымшаға  кіру арқылы",
        read_oferta_3: "оның шарттарымен келісесіз.",
        read_oferta_4: "Жай және түсінікті жағдайлар туралы.",
        agree_with_oferta: "Ұсынысқа сәйкес жарнаманы алуға келісемін."
      }
    },
    codeConfirm: {
      header: "SMS-кодты енгізіңіз",
      code_sent: "Коды нөмірге жіберілді:",
      repeat_sms_code: "SMS қайтадан жіберу",
      send_btn_txt: "Жіберу",
      error: {
        error_1: "Жарамсыз код.",
        error_2: "Кодты қайтадан енгізіңіз"
      }
    },
    select_vedom: {
      header: "Мекемені таңдаңыз",
      service_center: "ХҚКО",
      ministry_of_labor: "Еңбек және халықты әлеуметтік қорғау министрлігі",
      ministry_of_finance: "Қаржы министрлігі"
    },
    select_region: {
      header: "Аймақты таңдаңыз"
    },
    select_district: {
      header: "Ауданды таңдаңыз"
    },
    select_institute: {
      header: "Мекемені таңдаңыз"
    },
    estimate: {
      header: "Мекемені бағалаңыз",
      disappoint: "Неден көңіліңіз қалды?",
      do_not_like: "Не ұнамады?",
      like: "Не ұнады?",
      category:"Категория таңдаңыз",
      staff: "Қызметкерлердің қабілетсіздігі",
      queue: "Кезекте тұру уақыты",
      room: "Күту бөлмесіндегі ыңғайсыз жағдайлар",
      invalid: "Мүгедектер үшін жағдайдың болмауы",
      comment: "Түсініктеме",
      placeholder_txt: "Пікір",
      attach_photo: "Фото бекітіңіз",
      send_btn_txt: "Жіберу"
    },
    wait_5_minute: {
      header: "Сіздің шағымыңыз қабылданды!",
      content:
        "Тиісті мекемеден қоңырауды күтіңіз. Шағым ситуациялық орталыққа жіберіледі.",
      called: "Сізге қоңырау шалды ма?",
      solved_problem: "Сіз мәселені шештіңіз бе?",
      yes: "Иә",
      no: "Жоқ"
    },
    after_eight_pm: {
      header: "Рахмет,шағым қабылданады,жұмыс уақытында хабарласады."
    },
    called: {
      header: "Қосымша пайдаланғаныңыз үшін рақмет!"
    },
    uncalled: {
      header: "Сіздің шағымыңыз жіберілді!",
      content:
        "Қазақстан Республикасының Мемлекеттік қызмет істері және сыбайлас жемқорлыққа қарсы іс-қимыл агенттігіне(",
      content_1: "ҚР МКICЖҚIKA",
      content_2:
        "Сіздің шағымыңыздың нәтижесі мекеме тексергеннен кейін белгілі болады.",
      back_to_main_page: "Басты бетке оралу"
    },
    wanna_be_connected: {
      thanks: "Біздің жұмысымызды",
      subheader: "бағалағаныңыз үшін рахмет!",
      wanna_be_contacted: "Сізбен байланысқанын қалайсыз ба?",
      yes: "Иә",
      no: "Жоқ"
    },

    example:"Кондиционирование1"
  },
  eng: {
    search: "Search",
    footer: "All rights reserved",
    yes: "Yes",
    no: "No",
    send_btn_txt: "Send",
    back: "Back",
    tutorial: {
      page_first: {
        header: "Organization",
        content: "Select the city and organization you want to rate."
      },
      page_second: {
        header: "Evaluation",
        content: "Rate the quality of service and leave a comment or complaint."
      },
      page_third: {
        header: "Call",
        content: "Wait for feedback within 5 minutes and get a solution."
      },
      button: {
        next: "Further",
        done: "Get started"
      }
    },

    sign_up: {
      header: "Sign up",
      error: "You entered an unavailable number",
      placeholder_text: "Telephone",
      send_btn_txt: "Send",
      oferta: {
        read_oferta_1: "Read the offer.",
        read_oferta_2: "By entering the application you",
        read_oferta_3: "accept its terms.",
        read_oferta_4: "- Simple and understandable about conditions.",
        agree_with_oferta:
          "I agree to receive advertising in compliance with the offer."
      }
    },
    codeConfirm: {
      header: "Enter SMS code",
      code_sent: "Code sent to number:",
      repeat_sms_code: "Send sms again",
      send_btn_txt: "Отправить",
      error: {
        error_1: "Invalid code.",
        error_2: "Enter code again"
      }
    },
    select_vedom: {
      header: "Choose departments",
      service_center: "Employment center",
      ministry_of_labor: "Ministry of Labor",
      ministry_of_finance: "Ministry of Finance"
    },
    select_region: {
      header: "Choose region"
    },
    select_district: {
      header: "Choose district"
    },
    select_institute: {
      header: "Choose institution"
    },
    estimate: {
      header: "Rate the institution",
      disappoint: "What exactly disappointed?",
      do_not_like: "What exactly didn't like?",
      like: "What did you like?",
      staff: "Staff incompetence",
      category:"Choose category",
      queue: "Queuing time",
      room: "Terrible conditions in the waiting room",
      invalid: "Lack of conditions for persons with disabilitie",
      comment: "Comment",
      placeholder_txt: "Your opinion",
      attach_photo: "Attach a photo",
      send_btn_txt: "Send"
    },
    wait_5_minute: {
      header: "Your complaint has been sent!",
      content:
        "Please wait for the call from the relevant institution. The complaint is directed to the situational center.",
      called: "Did you get a call?",
      solved_problem: "Have you solved the question?",
      yes: "Yes",
      no: "No"
    },
    after_eight_pm: {
      header:
        "Thank you, your application is accepted, you will be contacted during business hours."
    },
    called: {
      header: "Thank you for using the application!"
    },
    uncalled: {
      header: "Your complaint has been sent!",
      content:
        "To the Agency of the Republic of Kazakhstan on Civil Service Affairs and Anti-Corruption(",
      content_1: "ACSAA RK",
      content_2:
        "The result of your complaint will be known after checking the institution.",
      back_to_main_page: "Back to main page"
    },
    wanna_be_connected: {
      thanks: "Thank,",
      subheader: "you for appreciating our work!",
      wanna_be_contacted: "Do you want to be contacted?",
      yes: "Yes",
      no: "No"
    },
    example:"Кондиционирование3"
  }
});
export default strings;
