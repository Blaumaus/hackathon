import React, { useState, useContext } from 'react';
import { GradientButton } from '../components/GradientButton';
import { register, login } from '../api';
import { UserContext } from '../context/userContext';

const AuthPage = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [isLogin, setIsLogin] = useState(true);
const { updateUser, login, register } = useContext(UserContext);

 const handleSubmit = (e) => {
   e.preventDefault();
    if (isLogin) {
      login({ username, password });
    } else {
      register({ username, password });
    }
 };

 const toggleAuth = () => {
   setIsLogin(!isLogin);
 };

 return (
   <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
       <h1 className="text-3xl font-bold mb-6 text-center">
         {isLogin ? 'Вхід' : 'Реєстрація'}
       </h1>
       <form onSubmit={handleSubmit}>
         <div className="mb-4">
           <label htmlFor="username" className="block font-medium mb-2">
             Ім'я користувача
           </label>
           <input
             type="text"
             id="username"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           />
         </div>
         <div className="mb-6">
           <label htmlFor="password" className="block font-medium mb-2">
             Пароль
           </label>
           <input
             type="password"
             id="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           />
         </div>
         <div className="flex justify-between items-center mb-6">
           <GradientButton type="submit" className="px-6 py-3">
             {isLogin ? 'Увійти' : 'Зареєструватися'}
           </GradientButton>
           <button
             type="button"
             onClick={toggleAuth}
             className="text-blue-500 hover:text-blue-700 font-medium"
           >
             {isLogin
               ? 'Ще не зареєстровані? Зареєструватися'
               : 'Вже маєте акаунт? Увійти'}
           </button>
         </div>
       </form>
     </div>
   </div>
 );
};

export default AuthPage;