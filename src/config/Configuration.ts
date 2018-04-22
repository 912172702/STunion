export class Configuration{
   public static WEBSOCEET_TOKEN = 'stunion';
   public static IP_PORT = '172.20.10.2:8080';
   //public static IP_PORT = '10.9.189.38:8080';
   public static DOMAIN = 'http://' + Configuration.IP_PORT;
   public static PROJECT = '/sunion-main/';
   public static DOMAIN_PROJECT = Configuration.DOMAIN + Configuration.PROJECT;
   public static SUCCESS = 1;
   public static LOGIN_ERROR = 2;
   public static TEL_IS_BINDED = 3;
   public static IDCARD_IS_BINDED = 4;
   public static NO_SCHOOL_INFO = 5;
   public static JOIN_COURSE = 9;
   public static AREADY_IN_GROUP = 10;
   public static COURSE_NOT_FOUND = 11;
   public static UPLOAD_HEAD_ERROR = 12;
   public static SIMPLE_CALL_ROLL = 13;
   public static SPARE_TIME = 16;
   public static NORMAL_NOTIFICATION = 17;
   public static COURSE_APPLY = 18;
   public static PUBLISH_QUESTION = 19;
   public static ANSWER_RESULT = 20;
   public static STOP_QUESTION = 22;
   public static MORNING_COURSE_COUNT = 5;
   public static AFTERNOON_COURSE_COUNT = 4;
   public static EVENING_COURSE_COUNT = 3;
   public static NORMAL_NOTIFICATION_TYPE = 1;
   public static COURSE_APPLY_TYPE = 2; 
   public static QUESTION_CHOOSE_TYPE = 1;
   public static QUESTION_FILL_BLANK_TYPE = 2;
   public static USRE_TYPE_STUDENT = 1;
   public static USRE_TYPE_TEACHER = 2;
   //接受信息 发布的Event类型
   public static JOIN_COURSE_SUCCESS_EVENT = 'join_course_success_event';
   public static USER_CHANGE_EVENT = 'user_change_event';
   public static COURSE_CHANGE_EVENT = 'course_change_event';
   public static SIMPLE_CALL_ROLL_EVENT = 'simple_call_roll_event';
   public static CALL_ROLL_SUCCESS_EVENT = 'call_roll_success_event'
   public static SPARE_TIME_EVENT = 'spare_time_event';
   public static NORMAL_NOTIFICATION_EVENT = 'normal_notificaiton_event';
   public static COURSE_APPLY_EVENT = 'course_apply_event';
   public static PUBLISH_QUESTION_EVENT = 'publish_question_event';
   public static ANSWER_RESULT_EVENT = 'answer_result_event';
   public static STOP_QUESTION_EVENT = 'stop_question_event';
   public static NEWS_ADD_EVENT = 'news_add_event';
}
/*
LOGIN_FAIL(0, "登陆失败")
, LOGIN_SUCCESS(1, "登陆成功")
, LOGIN_ERROR(2, "手机号或密码错误")
, TEL_IS_BINDED(3, "手机号已被绑定")
, IDCARD_IS_BINDED(4, "身份证号已绑定")
*/