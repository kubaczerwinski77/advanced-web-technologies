<?php
/**
 * Plugin Name: Better ads
 * Description: Adds advertisements between post title and content.
 * Version: 1.0
 * Requires at least: 5.0
 * Requires PHP: 7.2
 * Author: Karolina Sawa, Jakub Czerwiński
 */

function register_admin_menu() {  
    add_menu_page("Manage advertisements", "Better ads", 'manage_options', "ads", "admin_page");    
} 
add_action('admin_menu', 'register_admin_menu'); 


function admin_page() {                   
    global $_POST; 
    $adsArr  =  is_array(get_option('advertisements')) ? get_option('advertisements') : [];

    if(isset($_POST['ad_title']) and isset($_POST['ad_content'])) {
        if(strlen($_POST['ad_title']) > 0 and strlen($_POST['ad_content']) > 0 ){
            $adsArr[$_POST['ad_title']] = $_POST['ad_content'];
            update_option('advertisements', $adsArr); 
            print_r($adsArr);
            echo'<div class="notice notice-success is-dismissible"><p>New advertisement has been added.</p></div>';
        }
        else if (strlen($_POST['ad_title']) == 0 and strlen($_POST['ad_content']) == 0 ){
            echo'<div class="notice notice-error is-dismissible"><p>Title and description cannot be empty!</p></div>'; 
        }
        else if (strlen($_POST['ad_title']) == 0){
            echo'<div class="notice notice-error is-dismissible"><p>Title cannot be empty!</p></div>'; 
        }
        else if (strlen($_POST['ad_content']) == 0){
            echo'<div class="notice notice-error is-dismissible"><p>Description cannot be empty!</p></div>'; 
        }
    }

    // if(isset($_POST['ad_title']) and isset($_POST['ad_content'])) {
    //     unset($adsArr[$_POST['ad_title']]);
    //     update_option('advertisements', $adsArr); 
    //     echo'<div class="notice notice-error is-dismissible"><p>Advertisement has been deleted.</p></div>';    
    // } 

    ?>
    <div>
        <form method="post">
            <p>Advertisement title:</p>
            <input type="text" name="ad_title" />
            <p>Advertisement content:</p>
            <textarea name="ad_content" type="text"></textarea>
            <button type="submit">Add</button>
        </form>
    </div>
    <?php
}

function random_advertisement($content){
    // $opAdList  =  is_array(get_option('ad_post_list')) ? get_option('ad_post_list') : [];
    // if(!empty($opAdList)){
    //     $randomElement = $opAdList[array_rand($opAdList, 1)];
    //     return "<div class='center' style='padding: 2rem; border: solid gray 2px; width: 100%'>$randomElement</div>".$content;
    // }
    // return $content;
    return "<div class=\"wrapper\">
        <div class=\"content_container\">
            <p class=\"title\">Annoucement title</p>
            <p class=\"desc\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac consectetur mauris, sit amet faucibus mi. Suspendisse vitae               cursus augue. Cras a nisi vel libero tincidunt placerat.</p>
        </div>
        <img class=\"image\" src=\"https://picsum.photos/250/150\" />
    </div>".$content;
}
add_filter('the_content', "random_advertisement");

function register_styles() { 
    wp_register_style('advertisement_styles', plugins_url('/css/style.css', __FILE__)); 
    wp_enqueue_style('advertisement_styles'); 
} 
add_action('init', 'register_styles');

?>