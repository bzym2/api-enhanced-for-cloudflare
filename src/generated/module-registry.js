'use strict'

const module0 = require('../../module/yunbei_today.js')
const module1 = require('../../module/yunbei_task_finish.js')
const module2 = require('../../module/yunbei_tasks_todo.js')
const module3 = require('../../module/yunbei_tasks.js')
const module4 = require('../../module/yunbei_sign.js')
const module5 = require('../../module/yunbei_receipt.js')
const module6 = require('../../module/yunbei_rcmd_song_history.js')
const module7 = require('../../module/yunbei_rcmd_song.js')
const module8 = require('../../module/yunbei_info.js')
const module9 = require('../../module/yunbei_expense.js')
const module10 = require('../../module/yunbei.js')
const module11 = require('../../module/weblog.js')
const module12 = require('../../module/voice_lyric.js')
const module13 = require('../../module/voice_detail.js')
const module14 = require('../../module/voice_delete.js')
const module15 = require('../../module/voicelist_trans.js')
const module16 = require('../../module/voicelist_search.js')
const module17 = require('../../module/voicelist_my_created.js')
const module18 = require('../../module/voicelist_list_search.js')
const module19 = require('../../module/voicelist_list.js')
const module20 = require('../../module/voicelist_detail.js')
const module21 = require('../../module/vip_timemachine.js')
const module22 = require('../../module/vip_tasks_v1.js')
const module23 = require('../../module/vip_tasks.js')
const module24 = require('../../module/vip_sign_info.js')
const module25 = require('../../module/vip_sign_history.js')
const module26 = require('../../module/vip_sign_detail.js')
const module27 = require('../../module/vip_sign.js')
const module28 = require('../../module/vip_info_v2.js')
const module29 = require('../../module/vip_info.js')
const module30 = require('../../module/vip_growthpoint_getall.js')
const module31 = require('../../module/vip_growthpoint_get.js')
const module32 = require('../../module/vip_growthpoint_details.js')
const module33 = require('../../module/vip_growthpoint.js')
const module34 = require('../../module/video_url.js')
const module35 = require('../../module/video_timeline_recommend.js')
const module36 = require('../../module/video_timeline_all.js')
const module37 = require('../../module/video_sub.js')
const module38 = require('../../module/video_group_list.js')
const module39 = require('../../module/video_group.js')
const module40 = require('../../module/video_detail_info.js')
const module41 = require('../../module/video_detail.js')
const module42 = require('../../module/video_category_list.js')
const module43 = require('../../module/verify_qrcodestatus.js')
const module44 = require('../../module/verify_getQr.js')
const module45 = require('../../module/user_update.js')
const module46 = require('../../module/user_subcount.js')
const module47 = require('../../module/user_social_status_support.js')
const module48 = require('../../module/user_social_status_rcmd.js')
const module49 = require('../../module/user_social_status_edit.js')
const module50 = require('../../module/user_social_status.js')
const module51 = require('../../module/user_replacephone.js')
const module52 = require('../../module/user_record.js')
const module53 = require('../../module/user_playlist_create.js')
const module54 = require('../../module/user_playlist_collect.js')
const module55 = require('../../module/user_playlist.js')
const module56 = require('../../module/user_mutualfollow_get.js')
const module57 = require('../../module/user_medal.js')
const module58 = require('../../module/user_level.js')
const module59 = require('../../module/user_follow_mixed.js')
const module60 = require('../../module/user_follows.js')
const module61 = require('../../module/user_followeds.js')
const module62 = require('../../module/user_event.js')
const module63 = require('../../module/user_dj.js')
const module64 = require('../../module/user_detail_new.js')
const module65 = require('../../module/user_detail.js')
const module66 = require('../../module/user_comment_history.js')
const module67 = require('../../module/user_cloud_detail.js')
const module68 = require('../../module/user_cloud_del.js')
const module69 = require('../../module/user_cloud.js')
const module70 = require('../../module/user_bindingcellphone.js')
const module71 = require('../../module/user_binding.js')
const module72 = require('../../module/user_audio.js')
const module73 = require('../../module/user_account.js')
const module74 = require('../../module/ugc_user_devote.js')
const module75 = require('../../module/ugc_song_get.js')
const module76 = require('../../module/ugc_mv_get.js')
const module77 = require('../../module/ugc_detail.js')
const module78 = require('../../module/ugc_artist_search.js')
const module79 = require('../../module/ugc_artist_get.js')
const module80 = require('../../module/ugc_album_get.js')
const module81 = require('../../module/top_song.js')
const module82 = require('../../module/top_playlist_highquality.js')
const module83 = require('../../module/top_playlist.js')
const module84 = require('../../module/top_mv.js')
const module85 = require('../../module/top_list.js')
const module86 = require('../../module/top_artists.js')
const module87 = require('../../module/top_album.js')
const module88 = require('../../module/toplist_detail_v2.js')
const module89 = require('../../module/toplist_detail.js')
const module90 = require('../../module/toplist_artist.js')
const module91 = require('../../module/toplist.js')
const module92 = require('../../module/topic_sublist.js')
const module93 = require('../../module/topic_detail_event_hot.js')
const module94 = require('../../module/topic_detail.js')
const module95 = require('../../module/threshold_detail_get.js')
const module96 = require('../../module/thinktank_audit_resource_update.js')
const module97 = require('../../module/thinktank_audit_resource_detail.js')
const module98 = require('../../module/summary_annual.js')
const module99 = require('../../module/style_song.js')
const module100 = require('../../module/style_preference.js')
const module101 = require('../../module/style_playlist.js')
const module102 = require('../../module/style_list.js')
const module103 = require('../../module/style_detail.js')
const module104 = require('../../module/style_artist.js')
const module105 = require('../../module/style_album.js')
const module106 = require('../../module/starpick_comments_summary.js')
const module107 = require('../../module/song_wiki_summary.js')
const module108 = require('../../module/song_url_v1_302.js')
const module109 = require('../../module/song_url_v1.js')
const module110 = require('../../module/song_url_ncmget.js')
const module111 = require('../../module/song_url_match.js')
const module112 = require('../../module/song_url.js')
const module113 = require('../../module/song_singledownlist.js')
const module114 = require('../../module/song_red_count.js')
const module115 = require('../../module/song_purchased.js')
const module116 = require('../../module/song_order_update.js')
const module117 = require('../../module/song_music_detail.js')
const module118 = require('../../module/song_monthdownlist.js')
const module119 = require('../../module/song_lyrics_mark_user_page.js')
const module120 = require('../../module/song_lyrics_mark_del.js')
const module121 = require('../../module/song_lyrics_mark_add.js')
const module122 = require('../../module/song_lyrics_mark.js')
const module123 = require('../../module/song_like_check.js')
const module124 = require('../../module/song_like.js')
const module125 = require('../../module/song_dynamic_cover.js')
const module126 = require('../../module/song_download_url_v1.js')
const module127 = require('../../module/song_download_url.js')
const module128 = require('../../module/song_downlist.js')
const module129 = require('../../module/song_detail.js')
const module130 = require('../../module/song_creators.js')
const module131 = require('../../module/song_copyright_rcmd.js')
const module132 = require('../../module/song_cloud_download.js')
const module133 = require('../../module/song_chorus.js')
const module134 = require('../../module/simi_user.js')
const module135 = require('../../module/simi_song.js')
const module136 = require('../../module/simi_playlist.js')
const module137 = require('../../module/simi_mv.js')
const module138 = require('../../module/simi_artist.js')
const module139 = require('../../module/sign_happy_info.js')
const module140 = require('../../module/signin_progress.js')
const module141 = require('../../module/sheet_preview.js')
const module142 = require('../../module/sheet_list.js')
const module143 = require('../../module/share_resource.js')
const module144 = require('../../module/setting.js')
const module145 = require('../../module/send_text.js')
const module146 = require('../../module/send_song.js')
const module147 = require('../../module/send_playlist.js')
const module148 = require('../../module/send_album.js')
const module149 = require('../../module/search_suggest_pc.js')
const module150 = require('../../module/search_suggest.js')
const module151 = require('../../module/search_multimatch.js')
const module152 = require('../../module/search_match.js')
const module153 = require('../../module/search_hot_detail.js')
const module154 = require('../../module/search_hot.js')
const module155 = require('../../module/search_default.js')
const module156 = require('../../module/search.js')
const module157 = require('../modules/scrobble_v1.js')
const module158 = require('../../module/scrobble.js')
const module159 = require('../../module/sati_timescene_resources_get.js')
const module160 = require('../../module/sati_tag_list.js')
const module161 = require('../../module/sati_resource_sub_list.js')
const module162 = require('../../module/sati_resource_sub.js')
const module163 = require('../../module/sati_resource_list_more.js')
const module164 = require('../../module/sati_resource_list.js')
const module165 = require('../../module/resource_like.js')
const module166 = require('../../module/rep_ugc_user_vip.js')
const module167 = require('../../module/rep_ugc_user_sign.js')
const module168 = require('../../module/rep_ugc_user_get.js')
const module169 = require('../../module/rep_ugc_user_collect-vip.js')
const module170 = require('../../module/rep_ugc_exam_submit.js')
const module171 = require('../../module/rep_ugc_exam_start.js')
const module172 = require('../../module/rep_ugc_exam_result_get.js')
const module173 = require('../../module/rep_ugc_exam_question_single_get.js')
const module174 = require('../../module/rep_ugc_exam_info_get.js')
const module175 = require('../../module/rep_ugc_activity_get.js')
const module176 = require('../../module/rep_ugc_activity_collect.js')
const module177 = require('../../module/relay_play_state_submit.js')
const module178 = require('../modules/related_playlist.js')
const module179 = require('../../module/related_allvideo.js')
const module180 = require('../modules/register_xeapikey.js')
const module181 = require('../modules/register_checktoken_v3.js')
const module182 = require('../modules/register_checktoken_v2.js')
const module183 = require('../../module/register_cellphone.js')
const module184 = require('../modules/register_anonimous.js')
const module185 = require('../../module/record_recent_voice.js')
const module186 = require('../../module/record_recent_video.js')
const module187 = require('../../module/record_recent_song.js')
const module188 = require('../../module/record_recent_playlist.js')
const module189 = require('../../module/record_recent_dj.js')
const module190 = require('../../module/record_recent_album.js')
const module191 = require('../../module/recommend_songs_dislike.js')
const module192 = require('../../module/recommend_songs.js')
const module193 = require('../../module/recommend_resource.js')
const module194 = require('../../module/recent_listen_list.js')
const module195 = require('../../module/rebind.js')
const module196 = require('../../module/radio_sport_get.js')
const module197 = require('../../module/program_recommend.js')
const module198 = require('../../module/pl_count.js')
const module199 = require('../../module/playmode_song_vector.js')
const module200 = require('../../module/playmode_intelligence_list.js')
const module201 = require('../../module/playlist_video_recent.js')
const module202 = require('../../module/playlist_update_playcount.js')
const module203 = require('../../module/playlist_update.js')
const module204 = require('../../module/playlist_track_delete.js')
const module205 = require('../../module/playlist_track_all.js')
const module206 = require('../../module/playlist_track_add.js')
const module207 = require('../../module/playlist_tracks.js')
const module208 = require('../../module/playlist_tags_update.js')
const module209 = require('../../module/playlist_subscribers.js')
const module210 = require('../../module/playlist_subscribe.js')
const module211 = require('../../module/playlist_privacy.js')
const module212 = require('../../module/playlist_order_update.js')
const module213 = require('../../module/playlist_name_update.js')
const module214 = require('../../module/playlist_mylike.js')
const module215 = require('../../module/playlist_import_task_status.js')
const module216 = require('../../module/playlist_import_name_task_create.js')
const module217 = require('../../module/playlist_hot.js')
const module218 = require('../../module/playlist_highquality_tags.js')
const module219 = require('../../module/playlist_detail_rcmd_get.js')
const module220 = require('../../module/playlist_detail_dynamic.js')
const module221 = require('../../module/playlist_detail.js')
const module222 = require('../../module/playlist_desc_update.js')
const module223 = require('../../module/playlist_delete.js')
const module224 = require('../../module/playlist_create.js')
const module225 = require('../../module/playlist_cover_update.js')
const module226 = require('../../module/playlist_catlist.js')
const module227 = require('../../module/playlist_category_list.js')
const module228 = require('../../module/personal_fm_mode.js')
const module229 = require('../../module/personal_fm.js')
const module230 = require('../../module/personalized_privatecontent_list.js')
const module231 = require('../../module/personalized_privatecontent.js')
const module232 = require('../../module/personalized_newsong.js')
const module233 = require('../../module/personalized_mv.js')
const module234 = require('../../module/personalized_djprogram.js')
const module235 = require('../../module/personalized.js')
const module236 = require('../../module/nickname_check.js')
const module237 = require('../../module/mv_url.js')
const module238 = require('../../module/mv_sublist.js')
const module239 = require('../../module/mv_sub.js')
const module240 = require('../../module/mv_first.js')
const module241 = require('../../module/mv_exclusive_rcmd.js')
const module242 = require('../../module/mv_detail_info.js')
const module243 = require('../../module/mv_detail.js')
const module244 = require('../../module/mv_all.js')
const module245 = require('../../module/music_first_listen_info.js')
const module246 = require('../../module/musician_vip_tasks.js')
const module247 = require('../../module/musician_tasks_new.js')
const module248 = require('../../module/musician_tasks.js')
const module249 = require('../../module/musician_sign.js')
const module250 = require('../../module/musician_play_trend.js')
const module251 = require('../../module/musician_data_overview.js')
const module252 = require('../../module/musician_cloudbean_obtain.js')
const module253 = require('../../module/musician_cloudbean.js')
const module254 = require('../../module/msg_recentcontact.js')
const module255 = require('../../module/msg_private_history.js')
const module256 = require('../../module/msg_private.js')
const module257 = require('../../module/msg_notices.js')
const module258 = require('../../module/msg_forwards.js')
const module259 = require('../../module/msg_comments.js')
const module260 = require('../../module/mlog_url.js')
const module261 = require('../../module/mlog_to_video.js')
const module262 = require('../../module/mlog_music_rcmd.js')
const module263 = require('../../module/middle_play_lottery_remain_chance.js')
const module264 = require('../../module/middle_play_do_lottery.js')
const module265 = require('../../module/lyric_new.js')
const module266 = require('../../module/lyric.js')
const module267 = require('../../module/logout.js')
const module268 = require('../../module/login_status.js')
const module269 = require('../../module/login_refresh.js')
const module270 = require('../../module/login_qr_key.js')
const module271 = require('../../module/login_qr_create.js')
const module272 = require('../../module/login_qr_check.js')
const module273 = require('../../module/login_cellphone.js')
const module274 = require('../../module/login.js')
const module275 = require('../../module/listen_data_year_report.js')
const module276 = require('../../module/listen_data_total.js')
const module277 = require('../../module/listen_data_today_song.js')
const module278 = require('../../module/listen_data_song_play_rank.js')
const module279 = require('../../module/listen_data_report.js')
const module280 = require('../../module/listen_data_realtime_report.js')
const module281 = require('../../module/listentogether_sync_playlist_get.js')
const module282 = require('../../module/listentogether_sync_list_command.js')
const module283 = require('../../module/listentogether_status.js')
const module284 = require('../../module/listentogether_room_create.js')
const module285 = require('../../module/listentogether_room_check.js')
const module286 = require('../../module/listentogether_play_command.js')
const module287 = require('../../module/listentogether_heatbeat.js')
const module288 = require('../../module/listentogether_end.js')
const module289 = require('../../module/listentogether_accept.js')
const module290 = require('../../module/likelist.js')
const module291 = require('../../module/like.js')
const module292 = require('../../module/lbs_city_code.js')
const module293 = require('../../module/inner_version.js')
const module294 = require('../../module/hug_comment.js')
const module295 = require('../../module/hot_topic.js')
const module296 = require('../../module/homepage_dragon_ball.js')
const module297 = require('../../module/homepage_block_page.js')
const module298 = require('../../module/history_recommend_songs_detail.js')
const module299 = require('../../module/history_recommend_songs.js')
const module300 = require('../../module/get_userids.js')
const module301 = require('../../module/follow.js')
const module302 = require('../../module/fm_trash.js')
const module303 = require('../../module/fanscenter_trend_list.js')
const module304 = require('../../module/fanscenter_overview_get.js')
const module305 = require('../../module/fanscenter_basicinfo_province_get.js')
const module306 = require('../../module/fanscenter_basicinfo_gender_get.js')
const module307 = require('../../module/fanscenter_basicinfo_age_get.js')
const module308 = require('../../module/event_forward.js')
const module309 = require('../../module/event_del.js')
const module310 = require('../../module/event.js')
const module311 = require('../modules/eapi_decrypt.js')
const module312 = require('../../module/dj_toplist_popular.js')
const module313 = require('../../module/dj_toplist_pay.js')
const module314 = require('../../module/dj_toplist_newcomer.js')
const module315 = require('../../module/dj_toplist_hours.js')
const module316 = require('../../module/dj_toplist.js')
const module317 = require('../../module/dj_today_perfered.js')
const module318 = require('../../module/dj_subscriber.js')
const module319 = require('../../module/dj_sublist.js')
const module320 = require('../../module/dj_sub.js')
const module321 = require('../../module/dj_recommend_type.js')
const module322 = require('../../module/dj_recommend.js')
const module323 = require('../../module/dj_radio_hot.js')
const module324 = require('../../module/dj_program_toplist_hours.js')
const module325 = require('../../module/dj_program_toplist.js')
const module326 = require('../../module/dj_program_detail.js')
const module327 = require('../../module/dj_program.js')
const module328 = require('../../module/dj_personalize_recommend.js')
const module329 = require('../../module/dj_paygift.js')
const module330 = require('../../module/dj_hot.js')
const module331 = require('../../module/dj_difm_subscribe_channels_get.js')
const module332 = require('../../module/dj_difm_playing_tracks_list.js')
const module333 = require('../../module/dj_difm_channel_unsubscribe.js')
const module334 = require('../../module/dj_difm_channel_subscribe.js')
const module335 = require('../../module/dj_difm_all_style_channel.js')
const module336 = require('../../module/dj_detail.js')
const module337 = require('../../module/dj_catelist.js')
const module338 = require('../../module/dj_category_recommend.js')
const module339 = require('../../module/dj_category_excludehot.js')
const module340 = require('../../module/dj_banner.js')
const module341 = require('../../module/djRadio_top.js')
const module342 = require('../../module/digitalAlbum_sales.js')
const module343 = require('../../module/digitalAlbum_purchased.js')
const module344 = require('../../module/digitalAlbum_ordering.js')
const module345 = require('../../module/digitalAlbum_detail.js')
const module346 = require('../../module/device_list.js')
const module347 = require('../../module/device_kickoff.js')
const module348 = require('../modules/decrypt.js')
const module349 = require('../../module/daily_signin.js')
const module350 = require('../../module/creator_authinfo_get.js')
const module351 = require('../../module/countries_code_list.js')
const module352 = require('../../module/comment_video.js')
const module353 = require('../../module/comment_report.js')
const module354 = require('../../module/comment_reply.js')
const module355 = require('../../module/comment_playlist.js')
const module356 = require('../../module/comment_new.js')
const module357 = require('../../module/comment_mv.js')
const module358 = require('../../module/comment_music.js')
const module359 = require('../../module/comment_like.js')
const module360 = require('../../module/comment_info_list.js')
const module361 = require('../../module/comment_hug_list.js')
const module362 = require('../../module/comment_hot.js')
const module363 = require('../../module/comment_floor.js')
const module364 = require('../../module/comment_event.js')
const module365 = require('../../module/comment_dj.js')
const module366 = require('../../module/comment_delete.js')
const module367 = require('../../module/comment_album.js')
const module368 = require('../../module/comment_add.js')
const module369 = require('../../module/comment.js')
const module370 = require('../modules/cloud_upload_token.js')
const module371 = require('../modules/cloud_upload_complete.js')
const module372 = require('../../module/cloud_match.js')
const module373 = require('../../module/cloud_lyric_get.js')
const module374 = require('../../module/cloud_import.js')
const module375 = require('../../module/cloudsearch.js')
const module376 = require('../modules/cloud.js')
const module377 = require('../../module/check_music.js')
const module378 = require('../../module/chart_song_detail.js')
const module379 = require('../../module/chart_detail.js')
const module380 = require('../../module/cellphone_existence_check.js')
const module381 = require('../../module/captcha_verify.js')
const module382 = require('../../module/captcha_sent_v1.js')
const module383 = require('../../module/captcha_sent.js')
const module384 = require('../../module/captcha_safe_sent.js')
const module385 = require('../../module/calendar.js')
const module386 = require('../../module/broadcast_sub.js')
const module387 = require('../../module/broadcast_channel_list.js')
const module388 = require('../../module/broadcast_channel_currentinfo.js')
const module389 = require('../../module/broadcast_channel_collect_list.js')
const module390 = require('../../module/broadcast_category_region_get.js')
const module391 = require('../../module/batch.js')
const module392 = require('../../module/banner.js')
const module393 = require('../../module/avatar_upload.js')
const module394 = require('../modules/audio_match.js')
const module395 = require('../../module/artist_video.js')
const module396 = require('../../module/artist_top_song.js')
const module397 = require('../../module/artist_sublist.js')
const module398 = require('../../module/artist_sub.js')
const module399 = require('../../module/artist_songs.js')
const module400 = require('../../module/artist_new_song_playall.js')
const module401 = require('../../module/artist_new_song_mv_list_v2.js')
const module402 = require('../../module/artist_new_song.js')
const module403 = require('../../module/artist_new_mv.js')
const module404 = require('../../module/artist_mv.js')
const module405 = require('../../module/artist_list.js')
const module406 = require('../../module/artist_follow_count.js')
const module407 = require('../../module/artist_fans.js')
const module408 = require('../../module/artist_detail_dynamic.js')
const module409 = require('../../module/artist_detail.js')
const module410 = require('../../module/artist_desc.js')
const module411 = require('../../module/artist_album.js')
const module412 = require('../../module/artists.js')
const module413 = require('../../module/api.js')
const module414 = require('../../module/album_sublist.js')
const module415 = require('../../module/album_sub.js')
const module416 = require('../../module/album_songsaleboard.js')
const module417 = require('../../module/album_privilege.js')
const module418 = require('../../module/album_newest.js')
const module419 = require('../../module/album_new.js')
const module420 = require('../../module/album_list_style.js')
const module421 = require('../../module/album_list.js')
const module422 = require('../../module/album_detail_dynamic.js')
const module423 = require('../../module/album_detail.js')
const module424 = require('../../module/album.js')
const module425 = require('../../module/aidj_content_rcmd.js')
const module426 = require('../../module/ad_listening_rights_gain.js')
const module427 = require('../../module/ad_listening_rights.js')
const module428 = require('../../module/ad_get.js')
const module429 = require('../../module/activate_init_profile.js')

module.exports = [
  { identifier: "yunbei_today", route: "/yunbei/today", module: module0 },
  { identifier: "yunbei_task_finish", route: "/yunbei/task/finish", module: module1 },
  { identifier: "yunbei_tasks_todo", route: "/yunbei/tasks/todo", module: module2 },
  { identifier: "yunbei_tasks", route: "/yunbei/tasks", module: module3 },
  { identifier: "yunbei_sign", route: "/yunbei/sign", module: module4 },
  { identifier: "yunbei_receipt", route: "/yunbei/receipt", module: module5 },
  { identifier: "yunbei_rcmd_song_history", route: "/yunbei/rcmd/song/history", module: module6 },
  { identifier: "yunbei_rcmd_song", route: "/yunbei/rcmd/song", module: module7 },
  { identifier: "yunbei_info", route: "/yunbei/info", module: module8 },
  { identifier: "yunbei_expense", route: "/yunbei/expense", module: module9 },
  { identifier: "yunbei", route: "/yunbei", module: module10 },
  { identifier: "weblog", route: "/weblog", module: module11 },
  { identifier: "voice_lyric", route: "/voice/lyric", module: module12 },
  { identifier: "voice_detail", route: "/voice/detail", module: module13 },
  { identifier: "voice_delete", route: "/voice/delete", module: module14 },
  { identifier: "voicelist_trans", route: "/voicelist/trans", module: module15 },
  { identifier: "voicelist_search", route: "/voicelist/search", module: module16 },
  { identifier: "voicelist_my_created", route: "/voicelist/my/created", module: module17 },
  { identifier: "voicelist_list_search", route: "/voicelist/list/search", module: module18 },
  { identifier: "voicelist_list", route: "/voicelist/list", module: module19 },
  { identifier: "voicelist_detail", route: "/voicelist/detail", module: module20 },
  { identifier: "vip_timemachine", route: "/vip/timemachine", module: module21 },
  { identifier: "vip_tasks_v1", route: "/vip/tasks/v1", module: module22 },
  { identifier: "vip_tasks", route: "/vip/tasks", module: module23 },
  { identifier: "vip_sign_info", route: "/vip/sign/info", module: module24 },
  { identifier: "vip_sign_history", route: "/vip/sign/history", module: module25 },
  { identifier: "vip_sign_detail", route: "/vip/sign/detail", module: module26 },
  { identifier: "vip_sign", route: "/vip/sign", module: module27 },
  { identifier: "vip_info_v2", route: "/vip/info/v2", module: module28 },
  { identifier: "vip_info", route: "/vip/info", module: module29 },
  { identifier: "vip_growthpoint_getall", route: "/vip/growthpoint/getall", module: module30 },
  { identifier: "vip_growthpoint_get", route: "/vip/growthpoint/get", module: module31 },
  { identifier: "vip_growthpoint_details", route: "/vip/growthpoint/details", module: module32 },
  { identifier: "vip_growthpoint", route: "/vip/growthpoint", module: module33 },
  { identifier: "video_url", route: "/video/url", module: module34 },
  { identifier: "video_timeline_recommend", route: "/video/timeline/recommend", module: module35 },
  { identifier: "video_timeline_all", route: "/video/timeline/all", module: module36 },
  { identifier: "video_sub", route: "/video/sub", module: module37 },
  { identifier: "video_group_list", route: "/video/group/list", module: module38 },
  { identifier: "video_group", route: "/video/group", module: module39 },
  { identifier: "video_detail_info", route: "/video/detail/info", module: module40 },
  { identifier: "video_detail", route: "/video/detail", module: module41 },
  { identifier: "video_category_list", route: "/video/category/list", module: module42 },
  { identifier: "verify_qrcodestatus", route: "/verify/qrcodestatus", module: module43 },
  { identifier: "verify_getQr", route: "/verify/getQr", module: module44 },
  { identifier: "user_update", route: "/user/update", module: module45 },
  { identifier: "user_subcount", route: "/user/subcount", module: module46 },
  { identifier: "user_social_status_support", route: "/user/social/status/support", module: module47 },
  { identifier: "user_social_status_rcmd", route: "/user/social/status/rcmd", module: module48 },
  { identifier: "user_social_status_edit", route: "/user/social/status/edit", module: module49 },
  { identifier: "user_social_status", route: "/user/social/status", module: module50 },
  { identifier: "user_replacephone", route: "/user/replacephone", module: module51 },
  { identifier: "user_record", route: "/user/record", module: module52 },
  { identifier: "user_playlist_create", route: "/user/playlist/create", module: module53 },
  { identifier: "user_playlist_collect", route: "/user/playlist/collect", module: module54 },
  { identifier: "user_playlist", route: "/user/playlist", module: module55 },
  { identifier: "user_mutualfollow_get", route: "/user/mutualfollow/get", module: module56 },
  { identifier: "user_medal", route: "/user/medal", module: module57 },
  { identifier: "user_level", route: "/user/level", module: module58 },
  { identifier: "user_follow_mixed", route: "/user/follow/mixed", module: module59 },
  { identifier: "user_follows", route: "/user/follows", module: module60 },
  { identifier: "user_followeds", route: "/user/followeds", module: module61 },
  { identifier: "user_event", route: "/user/event", module: module62 },
  { identifier: "user_dj", route: "/user/dj", module: module63 },
  { identifier: "user_detail_new", route: "/user/detail/new", module: module64 },
  { identifier: "user_detail", route: "/user/detail", module: module65 },
  { identifier: "user_comment_history", route: "/user/comment/history", module: module66 },
  { identifier: "user_cloud_detail", route: "/user/cloud/detail", module: module67 },
  { identifier: "user_cloud_del", route: "/user/cloud/del", module: module68 },
  { identifier: "user_cloud", route: "/user/cloud", module: module69 },
  { identifier: "user_bindingcellphone", route: "/user/bindingcellphone", module: module70 },
  { identifier: "user_binding", route: "/user/binding", module: module71 },
  { identifier: "user_audio", route: "/user/audio", module: module72 },
  { identifier: "user_account", route: "/user/account", module: module73 },
  { identifier: "ugc_user_devote", route: "/ugc/user/devote", module: module74 },
  { identifier: "ugc_song_get", route: "/ugc/song/get", module: module75 },
  { identifier: "ugc_mv_get", route: "/ugc/mv/get", module: module76 },
  { identifier: "ugc_detail", route: "/ugc/detail", module: module77 },
  { identifier: "ugc_artist_search", route: "/ugc/artist/search", module: module78 },
  { identifier: "ugc_artist_get", route: "/ugc/artist/get", module: module79 },
  { identifier: "ugc_album_get", route: "/ugc/album/get", module: module80 },
  { identifier: "top_song", route: "/top/song", module: module81 },
  { identifier: "top_playlist_highquality", route: "/top/playlist/highquality", module: module82 },
  { identifier: "top_playlist", route: "/top/playlist", module: module83 },
  { identifier: "top_mv", route: "/top/mv", module: module84 },
  { identifier: "top_list", route: "/top/list", module: module85 },
  { identifier: "top_artists", route: "/top/artists", module: module86 },
  { identifier: "top_album", route: "/top/album", module: module87 },
  { identifier: "toplist_detail_v2", route: "/toplist/detail/v2", module: module88 },
  { identifier: "toplist_detail", route: "/toplist/detail", module: module89 },
  { identifier: "toplist_artist", route: "/toplist/artist", module: module90 },
  { identifier: "toplist", route: "/toplist", module: module91 },
  { identifier: "topic_sublist", route: "/topic/sublist", module: module92 },
  { identifier: "topic_detail_event_hot", route: "/topic/detail/event/hot", module: module93 },
  { identifier: "topic_detail", route: "/topic/detail", module: module94 },
  { identifier: "threshold_detail_get", route: "/threshold/detail/get", module: module95 },
  { identifier: "thinktank_audit_resource_update", route: "/thinktank/audit/resource/update", module: module96 },
  { identifier: "thinktank_audit_resource_detail", route: "/thinktank/audit/resource/detail", module: module97 },
  { identifier: "summary_annual", route: "/summary/annual", module: module98 },
  { identifier: "style_song", route: "/style/song", module: module99 },
  { identifier: "style_preference", route: "/style/preference", module: module100 },
  { identifier: "style_playlist", route: "/style/playlist", module: module101 },
  { identifier: "style_list", route: "/style/list", module: module102 },
  { identifier: "style_detail", route: "/style/detail", module: module103 },
  { identifier: "style_artist", route: "/style/artist", module: module104 },
  { identifier: "style_album", route: "/style/album", module: module105 },
  { identifier: "starpick_comments_summary", route: "/starpick/comments/summary", module: module106 },
  { identifier: "song_wiki_summary", route: "/song/wiki/summary", module: module107 },
  { identifier: "song_url_v1_302", route: "/song/url/v1/302", module: module108 },
  { identifier: "song_url_v1", route: "/song/url/v1", module: module109 },
  { identifier: "song_url_ncmget", route: "/song/url/ncmget", module: module110 },
  { identifier: "song_url_match", route: "/song/url/match", module: module111 },
  { identifier: "song_url", route: "/song/url", module: module112 },
  { identifier: "song_singledownlist", route: "/song/singledownlist", module: module113 },
  { identifier: "song_red_count", route: "/song/red/count", module: module114 },
  { identifier: "song_purchased", route: "/song/purchased", module: module115 },
  { identifier: "song_order_update", route: "/song/order/update", module: module116 },
  { identifier: "song_music_detail", route: "/song/music/detail", module: module117 },
  { identifier: "song_monthdownlist", route: "/song/monthdownlist", module: module118 },
  { identifier: "song_lyrics_mark_user_page", route: "/song/lyrics/mark/user/page", module: module119 },
  { identifier: "song_lyrics_mark_del", route: "/song/lyrics/mark/del", module: module120 },
  { identifier: "song_lyrics_mark_add", route: "/song/lyrics/mark/add", module: module121 },
  { identifier: "song_lyrics_mark", route: "/song/lyrics/mark", module: module122 },
  { identifier: "song_like_check", route: "/song/like/check", module: module123 },
  { identifier: "song_like", route: "/song/like", module: module124 },
  { identifier: "song_dynamic_cover", route: "/song/dynamic/cover", module: module125 },
  { identifier: "song_download_url_v1", route: "/song/download/url/v1", module: module126 },
  { identifier: "song_download_url", route: "/song/download/url", module: module127 },
  { identifier: "song_downlist", route: "/song/downlist", module: module128 },
  { identifier: "song_detail", route: "/song/detail", module: module129 },
  { identifier: "song_creators", route: "/song/creators", module: module130 },
  { identifier: "song_copyright_rcmd", route: "/song/copyright/rcmd", module: module131 },
  { identifier: "song_cloud_download", route: "/song/cloud/download", module: module132 },
  { identifier: "song_chorus", route: "/song/chorus", module: module133 },
  { identifier: "simi_user", route: "/simi/user", module: module134 },
  { identifier: "simi_song", route: "/simi/song", module: module135 },
  { identifier: "simi_playlist", route: "/simi/playlist", module: module136 },
  { identifier: "simi_mv", route: "/simi/mv", module: module137 },
  { identifier: "simi_artist", route: "/simi/artist", module: module138 },
  { identifier: "sign_happy_info", route: "/sign/happy/info", module: module139 },
  { identifier: "signin_progress", route: "/signin/progress", module: module140 },
  { identifier: "sheet_preview", route: "/sheet/preview", module: module141 },
  { identifier: "sheet_list", route: "/sheet/list", module: module142 },
  { identifier: "share_resource", route: "/share/resource", module: module143 },
  { identifier: "setting", route: "/setting", module: module144 },
  { identifier: "send_text", route: "/send/text", module: module145 },
  { identifier: "send_song", route: "/send/song", module: module146 },
  { identifier: "send_playlist", route: "/send/playlist", module: module147 },
  { identifier: "send_album", route: "/send/album", module: module148 },
  { identifier: "search_suggest_pc", route: "/search/suggest/pc", module: module149 },
  { identifier: "search_suggest", route: "/search/suggest", module: module150 },
  { identifier: "search_multimatch", route: "/search/multimatch", module: module151 },
  { identifier: "search_match", route: "/search/match", module: module152 },
  { identifier: "search_hot_detail", route: "/search/hot/detail", module: module153 },
  { identifier: "search_hot", route: "/search/hot", module: module154 },
  { identifier: "search_default", route: "/search/default", module: module155 },
  { identifier: "search", route: "/search", module: module156 },
  { identifier: "scrobble_v1", route: "/scrobble/v1", module: module157 },
  { identifier: "scrobble", route: "/scrobble", module: module158 },
  { identifier: "sati_timescene_resources_get", route: "/sati/timescene/resources/get", module: module159 },
  { identifier: "sati_tag_list", route: "/sati/tag/list", module: module160 },
  { identifier: "sati_resource_sub_list", route: "/sati/resource/sub/list", module: module161 },
  { identifier: "sati_resource_sub", route: "/sati/resource/sub", module: module162 },
  { identifier: "sati_resource_list_more", route: "/sati/resource/list/more", module: module163 },
  { identifier: "sati_resource_list", route: "/sati/resource/list", module: module164 },
  { identifier: "resource_like", route: "/resource/like", module: module165 },
  { identifier: "rep_ugc_user_vip", route: "/rep/ugc/user/vip", module: module166 },
  { identifier: "rep_ugc_user_sign", route: "/rep/ugc/user/sign", module: module167 },
  { identifier: "rep_ugc_user_get", route: "/rep/ugc/user/get", module: module168 },
  { identifier: "rep_ugc_user_collect-vip", route: "/rep/ugc/user/collect-vip", module: module169 },
  { identifier: "rep_ugc_exam_submit", route: "/rep/ugc/exam/submit", module: module170 },
  { identifier: "rep_ugc_exam_start", route: "/rep/ugc/exam/start", module: module171 },
  { identifier: "rep_ugc_exam_result_get", route: "/rep/ugc/exam/result/get", module: module172 },
  { identifier: "rep_ugc_exam_question_single_get", route: "/rep/ugc/exam/question/single/get", module: module173 },
  { identifier: "rep_ugc_exam_info_get", route: "/rep/ugc/exam/info/get", module: module174 },
  { identifier: "rep_ugc_activity_get", route: "/rep/ugc/activity/get", module: module175 },
  { identifier: "rep_ugc_activity_collect", route: "/rep/ugc/activity/collect", module: module176 },
  { identifier: "relay_play_state_submit", route: "/relay/play/state/submit", module: module177 },
  { identifier: "related_playlist", route: "/related/playlist", module: module178 },
  { identifier: "related_allvideo", route: "/related/allvideo", module: module179 },
  { identifier: "register_xeapikey", route: "/register/xeapikey", module: module180 },
  { identifier: "register_checktoken_v3", route: "/register/checktoken/v3", module: module181 },
  { identifier: "register_checktoken_v2", route: "/register/checktoken/v2", module: module182 },
  { identifier: "register_cellphone", route: "/register/cellphone", module: module183 },
  { identifier: "register_anonimous", route: "/register/anonimous", module: module184 },
  { identifier: "record_recent_voice", route: "/record/recent/voice", module: module185 },
  { identifier: "record_recent_video", route: "/record/recent/video", module: module186 },
  { identifier: "record_recent_song", route: "/record/recent/song", module: module187 },
  { identifier: "record_recent_playlist", route: "/record/recent/playlist", module: module188 },
  { identifier: "record_recent_dj", route: "/record/recent/dj", module: module189 },
  { identifier: "record_recent_album", route: "/record/recent/album", module: module190 },
  { identifier: "recommend_songs_dislike", route: "/recommend/songs/dislike", module: module191 },
  { identifier: "recommend_songs", route: "/recommend/songs", module: module192 },
  { identifier: "recommend_resource", route: "/recommend/resource", module: module193 },
  { identifier: "recent_listen_list", route: "/recent/listen/list", module: module194 },
  { identifier: "rebind", route: "/rebind", module: module195 },
  { identifier: "radio_sport_get", route: "/radio/sport/get", module: module196 },
  { identifier: "program_recommend", route: "/program/recommend", module: module197 },
  { identifier: "pl_count", route: "/pl/count", module: module198 },
  { identifier: "playmode_song_vector", route: "/playmode/song/vector", module: module199 },
  { identifier: "playmode_intelligence_list", route: "/playmode/intelligence/list", module: module200 },
  { identifier: "playlist_video_recent", route: "/playlist/video/recent", module: module201 },
  { identifier: "playlist_update_playcount", route: "/playlist/update/playcount", module: module202 },
  { identifier: "playlist_update", route: "/playlist/update", module: module203 },
  { identifier: "playlist_track_delete", route: "/playlist/track/delete", module: module204 },
  { identifier: "playlist_track_all", route: "/playlist/track/all", module: module205 },
  { identifier: "playlist_track_add", route: "/playlist/track/add", module: module206 },
  { identifier: "playlist_tracks", route: "/playlist/tracks", module: module207 },
  { identifier: "playlist_tags_update", route: "/playlist/tags/update", module: module208 },
  { identifier: "playlist_subscribers", route: "/playlist/subscribers", module: module209 },
  { identifier: "playlist_subscribe", route: "/playlist/subscribe", module: module210 },
  { identifier: "playlist_privacy", route: "/playlist/privacy", module: module211 },
  { identifier: "playlist_order_update", route: "/playlist/order/update", module: module212 },
  { identifier: "playlist_name_update", route: "/playlist/name/update", module: module213 },
  { identifier: "playlist_mylike", route: "/playlist/mylike", module: module214 },
  { identifier: "playlist_import_task_status", route: "/playlist/import/task/status", module: module215 },
  { identifier: "playlist_import_name_task_create", route: "/playlist/import/name/task/create", module: module216 },
  { identifier: "playlist_hot", route: "/playlist/hot", module: module217 },
  { identifier: "playlist_highquality_tags", route: "/playlist/highquality/tags", module: module218 },
  { identifier: "playlist_detail_rcmd_get", route: "/playlist/detail/rcmd/get", module: module219 },
  { identifier: "playlist_detail_dynamic", route: "/playlist/detail/dynamic", module: module220 },
  { identifier: "playlist_detail", route: "/playlist/detail", module: module221 },
  { identifier: "playlist_desc_update", route: "/playlist/desc/update", module: module222 },
  { identifier: "playlist_delete", route: "/playlist/delete", module: module223 },
  { identifier: "playlist_create", route: "/playlist/create", module: module224 },
  { identifier: "playlist_cover_update", route: "/playlist/cover/update", module: module225 },
  { identifier: "playlist_catlist", route: "/playlist/catlist", module: module226 },
  { identifier: "playlist_category_list", route: "/playlist/category/list", module: module227 },
  { identifier: "personal_fm_mode", route: "/personal/fm/mode", module: module228 },
  { identifier: "personal_fm", route: "/personal_fm", module: module229 },
  { identifier: "personalized_privatecontent_list", route: "/personalized/privatecontent/list", module: module230 },
  { identifier: "personalized_privatecontent", route: "/personalized/privatecontent", module: module231 },
  { identifier: "personalized_newsong", route: "/personalized/newsong", module: module232 },
  { identifier: "personalized_mv", route: "/personalized/mv", module: module233 },
  { identifier: "personalized_djprogram", route: "/personalized/djprogram", module: module234 },
  { identifier: "personalized", route: "/personalized", module: module235 },
  { identifier: "nickname_check", route: "/nickname/check", module: module236 },
  { identifier: "mv_url", route: "/mv/url", module: module237 },
  { identifier: "mv_sublist", route: "/mv/sublist", module: module238 },
  { identifier: "mv_sub", route: "/mv/sub", module: module239 },
  { identifier: "mv_first", route: "/mv/first", module: module240 },
  { identifier: "mv_exclusive_rcmd", route: "/mv/exclusive/rcmd", module: module241 },
  { identifier: "mv_detail_info", route: "/mv/detail/info", module: module242 },
  { identifier: "mv_detail", route: "/mv/detail", module: module243 },
  { identifier: "mv_all", route: "/mv/all", module: module244 },
  { identifier: "music_first_listen_info", route: "/music/first/listen/info", module: module245 },
  { identifier: "musician_vip_tasks", route: "/musician/vip/tasks", module: module246 },
  { identifier: "musician_tasks_new", route: "/musician/tasks/new", module: module247 },
  { identifier: "musician_tasks", route: "/musician/tasks", module: module248 },
  { identifier: "musician_sign", route: "/musician/sign", module: module249 },
  { identifier: "musician_play_trend", route: "/musician/play/trend", module: module250 },
  { identifier: "musician_data_overview", route: "/musician/data/overview", module: module251 },
  { identifier: "musician_cloudbean_obtain", route: "/musician/cloudbean/obtain", module: module252 },
  { identifier: "musician_cloudbean", route: "/musician/cloudbean", module: module253 },
  { identifier: "msg_recentcontact", route: "/msg/recentcontact", module: module254 },
  { identifier: "msg_private_history", route: "/msg/private/history", module: module255 },
  { identifier: "msg_private", route: "/msg/private", module: module256 },
  { identifier: "msg_notices", route: "/msg/notices", module: module257 },
  { identifier: "msg_forwards", route: "/msg/forwards", module: module258 },
  { identifier: "msg_comments", route: "/msg/comments", module: module259 },
  { identifier: "mlog_url", route: "/mlog/url", module: module260 },
  { identifier: "mlog_to_video", route: "/mlog/to/video", module: module261 },
  { identifier: "mlog_music_rcmd", route: "/mlog/music/rcmd", module: module262 },
  { identifier: "middle_play_lottery_remain_chance", route: "/middle/play/lottery/remain/chance", module: module263 },
  { identifier: "middle_play_do_lottery", route: "/middle/play/do/lottery", module: module264 },
  { identifier: "lyric_new", route: "/lyric/new", module: module265 },
  { identifier: "lyric", route: "/lyric", module: module266 },
  { identifier: "logout", route: "/logout", module: module267 },
  { identifier: "login_status", route: "/login/status", module: module268 },
  { identifier: "login_refresh", route: "/login/refresh", module: module269 },
  { identifier: "login_qr_key", route: "/login/qr/key", module: module270 },
  { identifier: "login_qr_create", route: "/login/qr/create", module: module271 },
  { identifier: "login_qr_check", route: "/login/qr/check", module: module272 },
  { identifier: "login_cellphone", route: "/login/cellphone", module: module273 },
  { identifier: "login", route: "/login", module: module274 },
  { identifier: "listen_data_year_report", route: "/listen/data/year/report", module: module275 },
  { identifier: "listen_data_total", route: "/listen/data/total", module: module276 },
  { identifier: "listen_data_today_song", route: "/listen/data/today/song", module: module277 },
  { identifier: "listen_data_song_play_rank", route: "/listen/data/song/play/rank", module: module278 },
  { identifier: "listen_data_report", route: "/listen/data/report", module: module279 },
  { identifier: "listen_data_realtime_report", route: "/listen/data/realtime/report", module: module280 },
  { identifier: "listentogether_sync_playlist_get", route: "/listentogether/sync/playlist/get", module: module281 },
  { identifier: "listentogether_sync_list_command", route: "/listentogether/sync/list/command", module: module282 },
  { identifier: "listentogether_status", route: "/listentogether/status", module: module283 },
  { identifier: "listentogether_room_create", route: "/listentogether/room/create", module: module284 },
  { identifier: "listentogether_room_check", route: "/listentogether/room/check", module: module285 },
  { identifier: "listentogether_play_command", route: "/listentogether/play/command", module: module286 },
  { identifier: "listentogether_heatbeat", route: "/listentogether/heatbeat", module: module287 },
  { identifier: "listentogether_end", route: "/listentogether/end", module: module288 },
  { identifier: "listentogether_accept", route: "/listentogether/accept", module: module289 },
  { identifier: "likelist", route: "/likelist", module: module290 },
  { identifier: "like", route: "/like", module: module291 },
  { identifier: "lbs_city_code", route: "/lbs/city/code", module: module292 },
  { identifier: "inner_version", route: "/inner/version", module: module293 },
  { identifier: "hug_comment", route: "/hug/comment", module: module294 },
  { identifier: "hot_topic", route: "/hot/topic", module: module295 },
  { identifier: "homepage_dragon_ball", route: "/homepage/dragon/ball", module: module296 },
  { identifier: "homepage_block_page", route: "/homepage/block/page", module: module297 },
  { identifier: "history_recommend_songs_detail", route: "/history/recommend/songs/detail", module: module298 },
  { identifier: "history_recommend_songs", route: "/history/recommend/songs", module: module299 },
  { identifier: "get_userids", route: "/get/userids", module: module300 },
  { identifier: "follow", route: "/follow", module: module301 },
  { identifier: "fm_trash", route: "/fm_trash", module: module302 },
  { identifier: "fanscenter_trend_list", route: "/fanscenter/trend/list", module: module303 },
  { identifier: "fanscenter_overview_get", route: "/fanscenter/overview/get", module: module304 },
  { identifier: "fanscenter_basicinfo_province_get", route: "/fanscenter/basicinfo/province/get", module: module305 },
  { identifier: "fanscenter_basicinfo_gender_get", route: "/fanscenter/basicinfo/gender/get", module: module306 },
  { identifier: "fanscenter_basicinfo_age_get", route: "/fanscenter/basicinfo/age/get", module: module307 },
  { identifier: "event_forward", route: "/event/forward", module: module308 },
  { identifier: "event_del", route: "/event/del", module: module309 },
  { identifier: "event", route: "/event", module: module310 },
  { identifier: "eapi_decrypt", route: "/eapi/decrypt", module: module311 },
  { identifier: "dj_toplist_popular", route: "/dj/toplist/popular", module: module312 },
  { identifier: "dj_toplist_pay", route: "/dj/toplist/pay", module: module313 },
  { identifier: "dj_toplist_newcomer", route: "/dj/toplist/newcomer", module: module314 },
  { identifier: "dj_toplist_hours", route: "/dj/toplist/hours", module: module315 },
  { identifier: "dj_toplist", route: "/dj/toplist", module: module316 },
  { identifier: "dj_today_perfered", route: "/dj/today/perfered", module: module317 },
  { identifier: "dj_subscriber", route: "/dj/subscriber", module: module318 },
  { identifier: "dj_sublist", route: "/dj/sublist", module: module319 },
  { identifier: "dj_sub", route: "/dj/sub", module: module320 },
  { identifier: "dj_recommend_type", route: "/dj/recommend/type", module: module321 },
  { identifier: "dj_recommend", route: "/dj/recommend", module: module322 },
  { identifier: "dj_radio_hot", route: "/dj/radio/hot", module: module323 },
  { identifier: "dj_program_toplist_hours", route: "/dj/program/toplist/hours", module: module324 },
  { identifier: "dj_program_toplist", route: "/dj/program/toplist", module: module325 },
  { identifier: "dj_program_detail", route: "/dj/program/detail", module: module326 },
  { identifier: "dj_program", route: "/dj/program", module: module327 },
  { identifier: "dj_personalize_recommend", route: "/dj/personalize/recommend", module: module328 },
  { identifier: "dj_paygift", route: "/dj/paygift", module: module329 },
  { identifier: "dj_hot", route: "/dj/hot", module: module330 },
  { identifier: "dj_difm_subscribe_channels_get", route: "/dj/difm/subscribe/channels/get", module: module331 },
  { identifier: "dj_difm_playing_tracks_list", route: "/dj/difm/playing/tracks/list", module: module332 },
  { identifier: "dj_difm_channel_unsubscribe", route: "/dj/difm/channel/unsubscribe", module: module333 },
  { identifier: "dj_difm_channel_subscribe", route: "/dj/difm/channel/subscribe", module: module334 },
  { identifier: "dj_difm_all_style_channel", route: "/dj/difm/all/style/channel", module: module335 },
  { identifier: "dj_detail", route: "/dj/detail", module: module336 },
  { identifier: "dj_catelist", route: "/dj/catelist", module: module337 },
  { identifier: "dj_category_recommend", route: "/dj/category/recommend", module: module338 },
  { identifier: "dj_category_excludehot", route: "/dj/category/excludehot", module: module339 },
  { identifier: "dj_banner", route: "/dj/banner", module: module340 },
  { identifier: "djRadio_top", route: "/djRadio/top", module: module341 },
  { identifier: "digitalAlbum_sales", route: "/digitalAlbum/sales", module: module342 },
  { identifier: "digitalAlbum_purchased", route: "/digitalAlbum/purchased", module: module343 },
  { identifier: "digitalAlbum_ordering", route: "/digitalAlbum/ordering", module: module344 },
  { identifier: "digitalAlbum_detail", route: "/digitalAlbum/detail", module: module345 },
  { identifier: "device_list", route: "/device/list", module: module346 },
  { identifier: "device_kickoff", route: "/device/kickoff", module: module347 },
  { identifier: "decrypt", route: "/decrypt", module: module348 },
  { identifier: "daily_signin", route: "/daily_signin", module: module349 },
  { identifier: "creator_authinfo_get", route: "/creator/authinfo/get", module: module350 },
  { identifier: "countries_code_list", route: "/countries/code/list", module: module351 },
  { identifier: "comment_video", route: "/comment/video", module: module352 },
  { identifier: "comment_report", route: "/comment/report", module: module353 },
  { identifier: "comment_reply", route: "/comment/reply", module: module354 },
  { identifier: "comment_playlist", route: "/comment/playlist", module: module355 },
  { identifier: "comment_new", route: "/comment/new", module: module356 },
  { identifier: "comment_mv", route: "/comment/mv", module: module357 },
  { identifier: "comment_music", route: "/comment/music", module: module358 },
  { identifier: "comment_like", route: "/comment/like", module: module359 },
  { identifier: "comment_info_list", route: "/comment/info/list", module: module360 },
  { identifier: "comment_hug_list", route: "/comment/hug/list", module: module361 },
  { identifier: "comment_hot", route: "/comment/hot", module: module362 },
  { identifier: "comment_floor", route: "/comment/floor", module: module363 },
  { identifier: "comment_event", route: "/comment/event", module: module364 },
  { identifier: "comment_dj", route: "/comment/dj", module: module365 },
  { identifier: "comment_delete", route: "/comment/delete", module: module366 },
  { identifier: "comment_album", route: "/comment/album", module: module367 },
  { identifier: "comment_add", route: "/comment/add", module: module368 },
  { identifier: "comment", route: "/comment", module: module369 },
  { identifier: "cloud_upload_token", route: "/cloud/upload/token", module: module370 },
  { identifier: "cloud_upload_complete", route: "/cloud/upload/complete", module: module371 },
  { identifier: "cloud_match", route: "/cloud/match", module: module372 },
  { identifier: "cloud_lyric_get", route: "/cloud/lyric/get", module: module373 },
  { identifier: "cloud_import", route: "/cloud/import", module: module374 },
  { identifier: "cloudsearch", route: "/cloudsearch", module: module375 },
  { identifier: "cloud", route: "/cloud", module: module376 },
  { identifier: "check_music", route: "/check/music", module: module377 },
  { identifier: "chart_song_detail", route: "/chart/song/detail", module: module378 },
  { identifier: "chart_detail", route: "/chart/detail", module: module379 },
  { identifier: "cellphone_existence_check", route: "/cellphone/existence/check", module: module380 },
  { identifier: "captcha_verify", route: "/captcha/verify", module: module381 },
  { identifier: "captcha_sent_v1", route: "/captcha/sent/v1", module: module382 },
  { identifier: "captcha_sent", route: "/captcha/sent", module: module383 },
  { identifier: "captcha_safe_sent", route: "/captcha/safe/sent", module: module384 },
  { identifier: "calendar", route: "/calendar", module: module385 },
  { identifier: "broadcast_sub", route: "/broadcast/sub", module: module386 },
  { identifier: "broadcast_channel_list", route: "/broadcast/channel/list", module: module387 },
  { identifier: "broadcast_channel_currentinfo", route: "/broadcast/channel/currentinfo", module: module388 },
  { identifier: "broadcast_channel_collect_list", route: "/broadcast/channel/collect/list", module: module389 },
  { identifier: "broadcast_category_region_get", route: "/broadcast/category/region/get", module: module390 },
  { identifier: "batch", route: "/batch", module: module391 },
  { identifier: "banner", route: "/banner", module: module392 },
  { identifier: "avatar_upload", route: "/avatar/upload", module: module393 },
  { identifier: "audio_match", route: "/audio/match", module: module394 },
  { identifier: "artist_video", route: "/artist/video", module: module395 },
  { identifier: "artist_top_song", route: "/artist/top/song", module: module396 },
  { identifier: "artist_sublist", route: "/artist/sublist", module: module397 },
  { identifier: "artist_sub", route: "/artist/sub", module: module398 },
  { identifier: "artist_songs", route: "/artist/songs", module: module399 },
  { identifier: "artist_new_song_playall", route: "/artist/new/song/playall", module: module400 },
  { identifier: "artist_new_song_mv_list_v2", route: "/artist/new/song/mv/list/v2", module: module401 },
  { identifier: "artist_new_song", route: "/artist/new/song", module: module402 },
  { identifier: "artist_new_mv", route: "/artist/new/mv", module: module403 },
  { identifier: "artist_mv", route: "/artist/mv", module: module404 },
  { identifier: "artist_list", route: "/artist/list", module: module405 },
  { identifier: "artist_follow_count", route: "/artist/follow/count", module: module406 },
  { identifier: "artist_fans", route: "/artist/fans", module: module407 },
  { identifier: "artist_detail_dynamic", route: "/artist/detail/dynamic", module: module408 },
  { identifier: "artist_detail", route: "/artist/detail", module: module409 },
  { identifier: "artist_desc", route: "/artist/desc", module: module410 },
  { identifier: "artist_album", route: "/artist/album", module: module411 },
  { identifier: "artists", route: "/artists", module: module412 },
  { identifier: "api", route: "/api", module: module413 },
  { identifier: "album_sublist", route: "/album/sublist", module: module414 },
  { identifier: "album_sub", route: "/album/sub", module: module415 },
  { identifier: "album_songsaleboard", route: "/album/songsaleboard", module: module416 },
  { identifier: "album_privilege", route: "/album/privilege", module: module417 },
  { identifier: "album_newest", route: "/album/newest", module: module418 },
  { identifier: "album_new", route: "/album/new", module: module419 },
  { identifier: "album_list_style", route: "/album/list/style", module: module420 },
  { identifier: "album_list", route: "/album/list", module: module421 },
  { identifier: "album_detail_dynamic", route: "/album/detail/dynamic", module: module422 },
  { identifier: "album_detail", route: "/album/detail", module: module423 },
  { identifier: "album", route: "/album", module: module424 },
  { identifier: "aidj_content_rcmd", route: "/aidj/content/rcmd", module: module425 },
  { identifier: "ad_listening_rights_gain", route: "/ad/listening/rights/gain", module: module426 },
  { identifier: "ad_listening_rights", route: "/ad/listening/rights", module: module427 },
  { identifier: "ad_get", route: "/ad/get", module: module428 },
  { identifier: "activate_init_profile", route: "/activate/init/profile", module: module429 },
]
