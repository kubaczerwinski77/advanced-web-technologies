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

    if(isset($_POST['delete_title']) and strlen($_POST['delete_title']) > 0) {
        unset($adsArr[$_POST['delete_title']]);
        update_option('advertisements', $adsArr); 
        echo'<div class="notice notice-error is-dismissible"><p>Advertisement has been deleted.</p></div>';    
    } 

    ?>
    <div class="admin-container">
        <form method="post">
            <p class="ad_label">Advertisement title:</p>
            <input class="ad_title_input" type="text" name="ad_title" />
            <p class="ad_label">Advertisement content:</p>
            <textarea class="ad_content_input" type="text" name="ad_content"></textarea>
            <button class="submit_button" type="submit">Add</button>
        </form>
        <div class="list-wrapper">
            <p>Your ads:</p>
            <?php foreach ($adsArr as $title => $content) : ?>
                <form method="post">
                    <div class="item">
                        <p class="item-title"><?php echo $title ?></p>
                        <p class="item-desc"><?php echo $content ?></p>
                        <input type="hidden" name="delete_title" value="<?php echo $title ?>" />
                        <button class="delete_button" type="submit">Delete</button>
                    </div>
                </form>
            <?php endforeach ?>    
        </div>
    </div>
    <?php
}

function random_advertisement($content){
    $adsArr  =  is_array(get_option('advertisements')) ? get_option('advertisements') : [];
    $title = array_rand($adsArr);
    $content = $adsArr[$title];

    return "<div class=\"wrapper\">
        <div class=\"content_container\">
            <p class=\"title\">$title</p>
            <p class=\"desc\">$content</p>
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