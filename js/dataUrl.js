var org_url = 'http://127.0.0.1:8081';
var apiver = 'v1';
var dataUrl = {
	/* 公用接口  */
	"commons": "/c/" + apiver + "/commons",
	"knowledgetree": "/c/" + apiver + "/knowledgetree", //知识点树，题目树
	"resetpass":"/m/" + apiver + "/student/",  //学生重置密码
	"editkonwledname":"/m/" + apiver + "/section/codename",
	/* 登录  */
	"login": "/m/" + apiver + "/manager/login/",
	"getcode":"/m/" + apiver + "/manager/", //获取手机号验证码
	"restpassword": "/m/" + apiver + "/manager/",

	"edition": { //版本
		"editionList": "/edition", //版本列表 get, ?page + size
		"updateEdition": "/edition", //更新版本 put, /id
		"createEdition": "/edition", //新建版本 post
		"getEdition": "/edition" //获取单个版本 get, /id
	},
	"GradeBook": { //教材管理
		"orgList": "/GradeBook/orgList" //教材管理树形图
	},
	//	"organization":{ //机构管理
	//		"educationAll": "/institution/tree", //所有机构
	//		"educationAdd": "/institution/",  //增加post
	//		"educationEdit": "/institution/", //修改机构put+id
	//		"educationDel": "/institution/",  //删除机构delete+id
	//	},
	/* 机构  */
	"institutions": "/m/" + apiver + "/institutions/", //所有机构
	'institution': "/m/" + apiver + "/institution/",  //增加post，删除delete+{id},修改put+{id}
	"schools": "/m/" + apiver + "/schools/", //获取学校列表,
	"school": "/m/" + apiver + "/school/", //获取学校列表,
	"grades": "/m/" + apiver + "/school/grades/", //年级列表
	"clazzs": "/m/" + apiver + "/clazz/", //班级列表
	"teachers": "/m/" + apiver + "/teachers/", //查询老师
	"course":"/m/" + apiver + "/course/",

	//	"schoolLists": "/school/",
	"clazz": {
		"clazz": "/clazz/",
		"grades": "/school/grades/",
		"course": "/course/",
		"teacher": "/apiteacher/"
	},
	"textbook": {
		"getTerms": "/textbook/searchTerm", //年级课本列表 get, ?page + size
		"getCourse": "/textbook/searchCourse", //科目列表 get, ?page + size
		"getTextbooks": "/textbook", //课本列表 get, ?page+
		"updateTextbook": "/textbook", //课本列表 put + id
		"newTextbook": "/textbook", //新增课本 post
	},
	"chapter": { //章节
		"sectiontree": "/section/selectSectionTree/",
		"section": "/section"
	},
	"knowledge": { //知识点
		"sectiontree": "/section/selectKnowledgeTree/",
		"sectionKnowledge": "/sectionKnowledge/",
		"sectiontreeAll": "/section/sectioneditiontree/"
	},
	
	"roles": "/m/" + apiver + "/roles/", //角色列表
	"role": "/m/" + apiver + "/role/", //角色管理 post增 / delete+id删 / put+id改 / get+id查 //权限配置"/role/{id}/entry"//用户配置/role/{id}/managers
	"jurisdictionlist": "/m/v1/entry/tree", //权限列表
//	"jurisdiction": {
//		"jurisdictionlist": "/m/v1/entry/tree", //权限列表
//		"role": "/role/" //角色管理 post增 / delete+id删 / put+id改 / get+id查 //权限配置"/role/{id}/entry"//用户配置/role/{id}/managers
//	},
//	"manager": "/managers/",
	"schoolBook": {
		"getSchoolBooks": "/school/gradeBook", //获取学院关联的教材
		"newSchoolBooks": "/school/gradeBook" //提交学校年级教材
	},

	
	//	"studentmanager":{
	//		"schoollist": "/student/searchallschool/", //学校列表
	//		"studentlist": "/student/searchstudent/",//学生列表
	//		"addstudent": "/student/",//增加学生
	//		"selectstudent": "/student/searchstudentbyid/", //根据id查学生
	//		"exportstudent": "/student/excelfiledown", //导出
	//		"excelfileup": "/student/excelfileup",  //导入
	//		"batchChange": "/student/updatemorestudent/", //调班，禁用
	//		"downstudents": "/student/excelresultdown"  //下载导入后的数据
	//	},
	/* 学生  */
	"student": "/m/" + apiver + "/student/", //新建学生post,更新put,删除delete+/{id},单个学生查询get+/{id}
	"tostudent": "/m/" + apiver + "/student/excel/", //excel导入学生 
	"resultstudent": "/m/" + apiver + "/student/resultexcel/", //导入学生结果下载
	"exportstudent": "/m/" + apiver + "/student/excel/", //导出查询的学生
	"students": "/m/" + apiver + "/students/", //查询学生列表
	"studentstatus": "/m/" + apiver + "/students/attribute/", //学生状态，禁用，启用
	/* 教师  */
	"teacher": {
		"getTeachers": "/apiteacher/findteacher", //教师列表 模糊查询
		"getTeacher": "/apiteacher", //教师信息
		"addTeacher": "/apiteacher/addteacher", //添加教师
		"updateTeacher": "/apiteacher/updateteacher",
		"enableTeacher": "/apiteacher", //启用教师
		"deleteTeacher": "/apiteacher",
		"exportTeacher": "/apiteacher/excelfiledown", //导出教师
		"importTeacher": "/apiteacher/excelfileup", //导入教师
	},
	/* 家长  */
	"parent": "/m/" + apiver + "/parent/", //新建家长post,更新put,删除delete+/{id},单个学生查询get+/{id}
	"parentstaus": "/m/" + apiver + "/parent/status/", //更新家长状态put
	"parents": "/m/" + apiver + "/parents", //查询家长列表
	"parentsbystudent":"/p/v1/parent/",
	"studentbyclazz":"/m/v1/student/clazz/",
	/* 管理员 */
	
	"manager": "/m/" + apiver + "/manager/", //新建管理员post,更新put,删除delete+/{id},单个管理查询get+/{id}
	"managersstaus": "/m/" + apiver + "/manager/status/", //更新管理员状态put
	"managers": "/m/" + apiver + "/managers/", //查询管理员列表
	/* 题库  */
	"questions": "/c/" + apiver + "/questions/", //题库列表
	"question": "/c/" + apiver + "/question/", //上传题post,更新put,删除delete+/{id},单个题查询get+/{id}
	//	"questionbank": {
	//		"questionbanktree": "/section/sectioneditiontree/", //题库树
	//		"questionlist": "/question/",  //题目列表
	//		"commonlist": "/common/lists",  //科目学科学段列表
	//		"updatequestion": "/question/updatequestion", //更新题目
	//		"addquestion": "/question/addquestion"  //新增
	//	}

	"edition": "/c/" + apiver + "/edition",    //版本
	"term": "/c/" + apiver + "/term", //年级课本
	"courses": "/c/" + apiver + "/courses", //科目
	"textbooks": "/c/" + apiver + "/textbooks", //教材
	"textbook": "/c/" + apiver + "/textbook", //教材
	"schooltextbook": "/m/" + apiver + "/school/gradebook",  //学校的年级关联教材
	"teachers": "/m/" + apiver + "/teachers",  //教师列表
	"teacher": "/m/" + apiver + "/teacher",  //教师
	"excelteacher": "/m/" + apiver + "/teacher/excel",  //教师
	"commonlist": "/c/" + apiver + "/commons",  //教师
	"sectiontree":"/m/" + apiver + "/section/tree", //章节树
	"section":"/m/" + apiver + "/section", //章节
	"sectionknowledge":"/m/" + apiver + "/sectionknowledge", //知识点
	"knowledge":"/m/" + apiver + "/knowledge", //章节
	"sectioneditiontree":"/m/" + apiver +"/section/sectioneditiontree",
	
	/* 微课  */
	"videos":"/c/" + apiver + "/videos",  //微课列表
	"video":"/c/" + apiver + "/video/" ,//微课增删改查+id
	"getosstoken":"/c/" + apiver + "/oss/token"  //微课上传
}
