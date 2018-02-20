\set get_name_from_array `cat get_name_from_array.js`

insert into plv8.plv8_modules values ('get_name_from_array',false,:'get_name_from_array')
	ON CONFLICT (modname) DO UPDATE set (code,load_on_start) = (:'get_name_from_array',false) WHERE plv8_modules.modname = 'get_name_from_array';

\set strings `cat strings.js`

insert into plv8.plv8_modules values ('strings',true,:'strings')
	ON CONFLICT (modname) DO UPDATE set (code,load_on_start) = (:'strings',true) WHERE plv8_modules.modname = 'strings';
