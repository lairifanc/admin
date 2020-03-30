import React,{Component} from 'react'
import {Card,Input} from 'antd'
import style from './index.module.less'
class SlideAdd extends Component{
    render(h) {
        return(
            <div>
                <Card title='轮播图添加'>
                    名称:<Input placeholder='名字' className={style.input} ></Input><br/>
                    描述:<Input placeholder='描述' className={style.input} ></Input><br/>
                    地址:<Input placeholder='地址' className={style.input} ></Input><br/>
                    图片:<input type="file" ref='img' className={style.input}/> <button>上传图片</button>
                        <img width='120' height='80' src="" alt=""/>
                        <button>添加</button>
                </Card>
            </div>
        )
    }
}
export default SlideAdd