
//load files function
function load_ufm_files(el,b,url) {
var base=b;
var nav=$(el).find('#nav');
var main=$(el).find('#main');
var url=url==undefined?'':url;

$.ajax({url:"ufm_ajax.php",
	   data:{'base':base,'url':url},
	   type:'POST',
	   dataType:'JSON',
	   success:function(result){

//load links in nav bar
nav.html('');
if (result.links.length<1)
{
nav.append('<li><a href="#" onclick="load_ufm_files(\''+el+'\',\''+base+'\');">home</a></li>');
}
else {
path='';
nav.append('<li><a href="#" onclick="load_ufm_files(\''+el+'\',\''+base+'\');">home</a></li>');
for ($i in result.links)
{
name=result.links[$i];
nav.append('<li><a href="#" onclick="load_ufm_files(\''+el+'\',\''+base+'\',\''+path+name+'\');"">'+name+'</a></li>');
path+=name+'/';
}
}


//load files list
main.html('');
path=url==''?path='':url+'/';

	if (result.files.length=='0') {main.append('<li class="text muted">Empty</li>');}

for ($i in result.files)
{
	
	name=result.files[$i].name;
	if (result.files[$i].type=='folder')
	{
main.append('<li class="folder"><a href="#" onclick="load_ufm_files(\''+el+'\',\''+base+'\',\''+path+name+'\');">'+name+'</a></li>');
	}
	else
	{
main.append('<li class="file"><a target="_blank" href="'+base+'/'+path+name+'"><span class="size">'+result.files[$i].size+'</span>'+name+'</a></li>');
	}
	
}

  }});
}


(function($) {

//make search values without case sensative
$.fn.load_ufm = function(b) {
jQuery.expr[':'].Contains = function(a,i,m){ return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0; };


this.each(function(){
var e=$(this);
load_ufm_files('#'+this.id,b);

//search files
$(this).find('#search_file').keyup(function(){
var el=e.find('#main');
var v=$(this).val();
if (v!='') {
el.find("li:not(:Contains(" + v + "))").slideUp("fast");
el.find("li:Contains(" + v + ")").slideDown("fast");
} 
else {
el.find("li").slideDown("fast");
}
});

});
    }

}(jQuery));