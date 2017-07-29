var org_url = 'http://127.0.0.1:8081';
var dataUrl={
	"edition":{//版本
		"editionList":"/edition",  //版本列表 get, ?page + size
		"updateEdition":"/edition", //更新版本 put, /id
		"createEdition":"/edition", //新建版本 post
		"getEdition":"/edition" //获取单个版本 get, /id
	},
	"GradeBook":{//教材管理
		"orgList":"/GradeBook/orgList"//教材管理树形图
	},
	"organization":{ //机构管理
		"educationAll": "/institution/tree", //所有机构
		"educationAdd": "/institution/",  //增加post
		"educationEdit": "/institution/", //修改机构put+id
		"educationDel": "/institution/",  //删除机构delete+id
	},
	"schoolLists": "/school/",
	"clazz": {
		"clazz": "/clazz/",
		"grades": "/school/grades/",
		"course": "/course/",
		"teacher": "/teacher/"
	},
	"textbook":{
		"getTerms":"/textbook/searchTerm", //年级课本列表 get, ?page + size
		"getCourse":"/textbook/searchCourse", //科目列表 get, ?page + size
		"getTextbooks":"/textbook",  //课本列表 get, ?page+
		"updateTextbook":"/textbook",  //课本列表 put + id
		"newTextbook":"/textbook", //新增课本 post
	},
	"chapter":{ //章节
		"sectiontree":"/section/selectSectionTree/",
		"section":"/section"
	},
	"knowledge":{ //知识点
		"sectiontree":"/section/selectKnowledgeTree/",
		"sectionKnowledge":"/sectionKnowledge/",
		"sectiontreeAll":"/section/selectSectionTreeForEdition/"
	},
	"jurisdiction":{
		"jurisdictionlist": "/entry/tree/", //权限列表
		"role": "/role/" //角色管理 post增 / delete+id删 / put+id改 / get+id查 //权限配置"/role/{id}/entry"//用户配置/role/{id}/managers
	},
	"manager": "/managers/",
	"schoolBook":{
		"getSchoolBooks":"/school/gradeBook", //获取学院关联的教材
		"newSchoolBooks":"/school/gradeBook"  //提交学校年级教材
	},
	"school":{
		"getSchools":"/school" //获取学校列表
	},
	"common":{
		"getCommonList":"/common/lists" //版本列表，年级列表，科目列表，年级课本列表，学段列表
	},
	"login": "/managers/login/",
	"studentmanager":{
		"schoollist": "/student/searchallschool/",
		"studentlist": "/student/searchstudent/",
		"addstudent": "/student/",//增加学生
		"selectstudent": "/student/searchstudentbyid/",
		"exportstudent": "/student/excelfiledown",
		"excelfileup": "/student/excelfileup"
	},
	"teacher":{
		"getTeachers":"/teacher/findteacher",  //教师列表 模糊查询
		"getTeacher":"/teacher",  //教师信息
		"addTeacher":"/teacher/addteacher",  //添加教师
		"updateTeacher":"/teacher/updateteacher",
		"enableTeacher":"/teacher",  //启用教师
		"deleteTeacher":"/teacher",
	}
}

