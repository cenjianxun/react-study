### 版本0.0.2

# 用jsx代替scss版本 
    to avoid css name crash by styled-components

    // todo 
    改版语法规则

# redux
    `yarn add redux react-redux redux-logger`

    reducer:
    const userReducer = (state, action) => {
        return {
            currentUser
        }
    }

    useContext -> redux
    useContext有父子继承域
    redux是全局store

# reselect 
    解决一个事件触发，全体store都更新的问题
    用pre cache的方式

# redux-persist
    `yarn add redux-persist`
    在本地缓存数据，用在 比如一刷新购物车里的东西就不见了之类 的问题。

# redux-thunk
    `yarn add redux-thunk`
    一种中间件
    初步理解为让 dispatch 支持函数

# redux-saga
    `yarn add redux-saga`
    reduces更新了之后仍然会启动

# 第三方支付功能 （stripe）
    `yarn add @stripe/stripe-js @stripe/react-stripe-js`
    密钥不能在前端保存，由前端向第三方request，因为安全性太低
    要由前端向后端发make payment 请求，后端再向第三方请求
    * 使用serverless的方式:
        `yarn add stripe dotenv`
        `npm install -g netlify-cli`
        