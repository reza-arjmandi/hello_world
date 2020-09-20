import React from 'react';
import ButtonAppBar from './ButtonAppBar'
import MenuDrawer from './MenuDrawer'

export default function Menu({
    on_close_menu, 
    on_menu_clicked, 
    menu_is_open, 
    menu_list,
    title, 
    is_log_in, 
    email, 
    open_login_dialog,  
    logout,  
    open_menu,

}) {

    return (
        <div>
            <ButtonAppBar 
                menu_is_open={menu_is_open}
                title={title}
                is_log_in={is_log_in}
                email={email}
                open_login_dialog={open_login_dialog}
                logout={logout}
                open_menu={open_menu}
                />
            <MenuDrawer 
                on_close_menu={on_close_menu} 
                on_menu_clicked={on_menu_clicked} 
                menu_is_open={menu_is_open} 
                menu_list={menu_list}
            />
        </div>
    );
};
