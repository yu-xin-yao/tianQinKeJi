window.onload = function () {
    //加载echarts图示
    mapAll("graph", option1);
    mapAll("pie", option2);
    mapAll("histogram", option3);


    /*点击加入li下划线*/
    forLiAll(my$("main_nav").getElementsByTagName("li"));

    //轮播图
    f();
};

//轮播图
function f() {
    var chefElement = {
        //获取页面元素
        main_slideshow: my$('main_slideshow'),
        imgBox: my$('imgBox'),
        ulObj: my$('ul1'),
        list: my$('ul1').getElementsByTagName('li'),
        imgWidth: my$('imgBox').offsetWidth,
        olObj: my$('bar'),
        arr: my$("arr"),
        left: my$("left"),
        right: my$("right"),
        pic: 0
    };

    //获取小方块
    for (var i = 0; i < chefElement.list.length; i++) {
        var liObj=document.createElement("li");

        chefElement.olObj.appendChild(liObj);
        liObj.setAttribute("index",i);

        //为按钮注册mouseover事件
        liObj.onmouseover=function () {

            chefElement.pic=this.getAttribute("index");
            animate(chefElement.ulObj,-chefElement.pic*chefElement.imgWidth);
        }

    }


    //克隆一个ul中第一个li,加入到ul中的最后=====克隆
    chefElement.ulObj.appendChild(chefElement.ulObj.children[0].cloneNode(true));

    var timeId=setInterval(onmouseclickHandle,1000);

    //左右焦点实现点击切换图片功能
    chefElement.main_slideshow.onmouseover=function () {
        clearInterval(timeId);
    };
    chefElement.main_slideshow.onmouseout=function () {
        timeId=setInterval(onmouseclickHandle,1000);
    };

    chefElement.right.onclick=onmouseclickHandle;
    function onmouseclickHandle() {
        //如果pic的值是5,恰巧是ul中li的个数-1的值,此时页面显示第六个图片,而用户会认为这是第一个图,
        //所以,如果用户再次点击按钮,用户应该看到第二个图片
        if (chefElement.pic == chefElement.list.length - 1) {
            //如何从第6个图,跳转到第一个图
            chefElement.pic = 0;//先设置pic=0
            chefElement.ulObj.style.left = 0 + "px";//把ul的位置还原成开始的默认位置
        }
        chefElement.pic++;//立刻设置pic加1,那么此时用户就会看到第二个图片了
        animate(chefElement.ulObj, -chefElement.pic * chefElement.imgWidth);//pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
    }
    chefElement.left.onclick=function () {
        if (chefElement.pic==0){
            chefElement.pic=chefElement.list.length-1;
            chefElement.ulObj.style.left=-chefElement.pic*chefElement.imgWidth+"px";
        }
        chefElement.pic--;
        animate(chefElement.ulObj,-chefElement.pic*chefElement.imgWidth);
    };

    //设置任意的一个元素,移动到指定的目标位置
    function animate(element, target) {
        clearInterval(element.timeId);
        //定时器的id值存储到对象的一个属性中
        element.timeId = setInterval(function () {
            //获取元素的当前的位置,数字类型
            var current = element.offsetLeft;
            //每次移动的距离
            var step = 10;
            step = current < target ? step : -step;
            //当前移动到位置
            current += step;
            if (Math.abs(current - target) > Math.abs(step)) {
                element.style.left = current + "px";
            } else {
                //清理定时器
                clearInterval(element.timeId);
                //直接到达目标
                element.style.left = target + "px";
            }
        }, 10);
    }
}

function my$(id) {
    return document.getElementById(id);
}

//for循环导航条添加点击事件
//element 需要循环的元素
function forLiAll(element) {
    for (i = 0; i < element.length; i++) {
        element[i].onclick = function () {
            this.style.textDecoration = "underline";
        };
    }
}


//加载echarts图示
//elementId：获取在哪显示的图示的id，option：图示的具体样式
function mapAll(elementId, option) {
    var dom = document.getElementById(elementId);
    var myChart = echarts.init(dom);

    var option = option;

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
}

//定义：曲线图
var option1 = {
    title: {
        left: 'center',
        text: '曲线图数据展示',
        textStyle: {
            lineHeight: 100
        }
    },
    grid: {
        top: '30%',
        bottom: '10%'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['04/14', '04/15', '04/16', '04/17', '04/18', '04/19', '04/20', '04/21', '04/22', '04/23', '04/24', '04/25', '04/26', '04/27', '04/28', '04/29', '04/30', '05/01', '05/02', '05/03', '05/04', '05/05', '05/06', '05/07', '05/08', '05/09', '05/10', '05/11', '05/12', '05/13'],
        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} 人'
        }
    },
    series: [{
        data: [6091, 3180, 5118, 6973, 4192, 1850, 8556, 8188, 3210, 4818, 8474, 565, 8924, 3842, 7975, 9102, 6816, 6612, 5936, 4516, 5557, 6668, 6130, 1085, 9484, 1389, 7702, 3009, 8413, 4327],
        type: 'line',
        symbol: 'circle',
        label: {
            show: true,
            position: 'top',
        },
        itemStyle: {
            normal: {
                lineStyle: {
                    width: 1,
                    color: '#3D86FF'
                }
            }
        },
        areaStyle: {
            color: '#F3F8FE',
        }
    }]
};

//定义：饼状图
var option2 = {
    title: {
        text: '饼状图数据展示',
        left: 'center',
        textStyle: {
            lineHeight: 60
        }
    },
    color: ['#C2342F', '#2F4655', '#62A0A9', '#D58166', '#91C8B0', '#759F83', '#C98723'],
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            top: '60px',
            type: 'pie',
            radius: '65%',
            data: [
                {value: 5521, name: 'Mon'},
                {value: 7431, name: 'Tue'},
                {value: 3138, name: 'Wed'},
                {value: 6629, name: 'Thu'},
                {value: 9537, name: 'Fri'},
                {value: 9228, name: 'Sat'},
                {value: 7607, name: 'Sun'}
            ]
        }
    ]
};

//定义：柱状图
var option3 = {
    title: {
        text: "柱状图数据显示",
        left: "center",
        textStyle: {
            lineHeight: 60
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top: '35%',
        left: '10%',
        right: '6%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: [
        {
            color: '#E0E6F1',
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                show: false
            }
        }
    ],
    yAxis: [
        {
            name: '商品数',
            type: 'value'
        }
    ],
    series: [
        {
            name: '商品数',
            type: 'bar',
            barWidth: '20%',
            data: [4748, 2537, 5864, 3923, 7402, 2336, 2286]
        }
    ]
};
