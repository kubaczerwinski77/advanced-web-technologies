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
<div style="display: flex; padding: 20px;">
   <div style="display: flex; flex-direction: column;">
      <form method="post">
         <p style="font-size: 20px; font-weight: bold; margin-bottom: 5px;"
            >Advertisement title:</p>
         <input class="ad_title_input" type="text" name="ad_title" />
         <p style="font-size: 20px; font-weight: bold; margin-bottom: 5px;"
            >Advertisement content:</p>
         <textarea style="height: 100px; width: 400px; resize: none;" type="text" name="ad_content"></textarea>
         <br/>
         <button style="
            padding: 5px 15px;
            border-radius: 5px;
            margin-top: 20px;
            cursor: pointer;
            " type="submit">Add</button>
      </form>
   </div>
   <div style="width: 100px;">
   </div>
   <div style="display: flex; flex-direction: column;">
      <p style="font-size: 20px; font-weight: bold; margin-bottom: 0;">Your ads:</p>
      <br/>
      <?php foreach ($adsArr as $title => $content): ?>
        <form method="post">
            <div style="
                display: flex;
                background-color: #fcfcfc;
                border-radius: 8px;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
                padding: 0 20px;
                width: 500px;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            ">
                <div style="display: flex; flex-direction: column;">
                <p style="margin-bottom: 0; font-size: 1.2rem;"><?php echo $title; ?></p>
                <p style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    line-clamp: 3;
                    max-width: 260px;
                    "><?php echo $content; ?></p>
                </div>
                <input type="hidden" name="delete_title" value="<?php echo $title; ?>" />
                <button style="padding: 5px 15px; border-radius: 5px; cursor: pointer;" type="submit">Delete</button>
            </div>
        </form>
      <?php endforeach; ?>    
   </div>
</div>
<?php
}

function random_advertisement($content){
    $adsArr  =  is_array(get_option('advertisements')) ? get_option('advertisements') : [];
    $ad_title = array_rand($adsArr);
    $ad_content = $adsArr[$ad_title];

    return "<div class=\"wrapper\">
        <div class=\"content_container\">
            <p class=\"title\">$ad_title</p>
            <p class=\"desc\">$ad_content</p>
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