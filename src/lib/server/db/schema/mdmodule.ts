import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { project_table } from './projects';
import { sql } from 'drizzle-orm';

export const maxDemandProjects_table = sqliteTable('maxdemand_project', {
	id: integer('id').primaryKey(),
	masterProjectId: integer('master_project_id').references(() => project_table.id),
	createAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});

export const resDemandTable = sqliteTable('res_demand', {
	id: integer('id').primaryKey(),
	maxDProjectId: integer('project_id').references(() => maxDemandProjects_table.id),
	NoUnits: integer('no_units').notNull(),
	ai: integer('interior_lighting'),
	aii: integer('exterior_lighting'),
	bi: integer('10a_sockets'),
	bii: integer('15a_sockets').default(10),
	biii: integer('20a_sockets').default(15),
	c: integer('cooking_appliances'),
	d: integer('heating'),
	e: integer('instantaneous_water_heating'),
	f: integer('storage_water_heating'),
	g: integer('pool_heating'),
	h: integer('communal_lighting'),
	i: integer('communal_sockets'),
	ji: integer('communal_washing'),
	jii: integer('communcal_ac'),
	jiii: integer('communcal_pool'),
	jiv: integer('electric_carcharges'),
	k: integer('lifts'),
	l: integer('motors'),
	m: integer('large_load')
});

export const comDemandTable = sqliteTable('com_demand', {
	id: integer('id').primaryKey(),
	maxProjectId: integer('project_id').references(() => maxDemandProjects_table.id),
	oLnpVA: integer('office_lnp_va'),
	oLnpArea: integer('office_lnp_area'),
	oAccVA: integer('office_acc_va'),
	oAccArea: integer('office_acc_area'),
	oAcrcVA: integer('okfice_acrc_va'),
	oAcrcArea: integer('office_acrc_area'),
	oAczhVA: integer('office_aczh_va'),
	oAczhArea: integer('office_aczh_area'),
	oAcvvVA: integer('office_acvv_va'),
	oAcvvArea: integer('office_acvv_area'),
	cpOaVA: integer('carpark_oa_va'),
	cpOaArea: integer('carpark_oa_area'),
	cpOaEVCharging: integer('carpark_oa_ev_charging'),
	cpOaEVChargingArea: integer('carpark_oa_ev_charging_area'),
	cpBVA: integer('carpark_basement_va'),
	cpBtArea: integer('carpark_basement_area'),
	cpBEVCharging: integer('carpark_basement_ev_charging'),
	cpBEVChargingArea: integer('carpark_basement_ev_charging_area'),
	rsLnpVA: integer('retail_lnp_va'),
	rsLnpArea: integer('retail_lnp_area'),
	rsAcVA: integer('retail_ac_va'),
	rsAcArea: integer('retail_ac_area'),
	wLnpVA: integer('warehouse_lnp_va'),
	wLnpArea: integer('warehouse_lnp_area'),
	wVVA: integer('warehouse_ventilation_va'),
	wVArea: integer('warehouse_ventilation_area'),
	wSp: integer('warehouse_special_equipment'),
	liLnpVA: integer('light_industrial_lnp_va'),
	liLnpArea: integer('light_industrial_lnp_area'),
	liVVA: integer('light_industrial_ventilation_va'),
	liVArea: integer('light_industrial_ventilation_area'),
	liAcVA: integer('light_industrial_ac_va'),
	liAcArea: integer('light_industrial_ac_area'),
	liSp: integer('light_industrial_special_equipment'),
	tVA: integer('taverns_va'),
	tArea: integer('taverns_area'),
	thVA: integer('theater_va'),
	thArea: integer('theater_area')
});
