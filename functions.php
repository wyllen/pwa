<?php
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

// Load scripts
function load_vue_scripts() {
    //wp_enqueue_style('blankslate/app.css', get_template_directory_uri() . '/dist/styles/app.css', false, null);
    wp_enqueue_script('blankslate/manifest.js', get_template_directory_uri() . '/dist/scripts/manifest.js', null, null, true);
    wp_enqueue_script('blankslate/vendor.js', get_template_directory_uri() . '/dist/scripts/vendor.js', null, null, true);
    wp_enqueue_script('blankslate/app.js', get_template_directory_uri() . '/dist/scripts/app.js', null, null, true);
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);

// Hide admin bar
add_action('after_setup_theme', 'remove_admin_bar');
 
function remove_admin_bar() {
  show_admin_bar(false);
}

// FA
add_action('ACFFA_always_enqueue_fa', 'enqueue_font_awesome');
 
function enqueue_font_awesome() {
  return true;
}


// Enable post thumbnail 
add_theme_support( 'post-thumbnails', array( 'post', 'card' ) );

// Modify WP API Response
function modify_api_response( $response, $post, $request ) {
    $cardCategoryId = $response->data['card_categories'][0];
    $category = get_term_by('id', $cardCategoryId, 'card_category');
    $categoryName = $category->name;
    $categorySlug = $category->slug;
    $categoryIcon = get_field('icon', $category);
    $response->data['card_category']['icon'] = $categoryIcon;
    $response->data['card_category']['name'] = $categoryName;
    $response->data['card_category']['slug'] = $categorySlug;

    $thumbnail_id = get_post_thumbnail_id( $post->ID );
    $thumbnail = wp_get_attachment_image_src( $thumbnail_id );
    $response->data['thumbnail'] = $thumbnail[0];
    return $response;
}
add_filter( 'rest_prepare_card', 'modify_api_response', 10, 3 );