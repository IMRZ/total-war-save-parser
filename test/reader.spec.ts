import { expect } from "chai";

import * as TwsParser from "../src";

describe('tws parser - browser', () => {

  it.only('should read troy save', async () => {
    const saveFileLocation = 'http://localhost:9876/base/test/savegames/troy.save';
    const arrayBuffer = await fetch(saveFileLocation).then(response => response.arrayBuffer());
    const result = TwsParser.read(arrayBuffer, true);
    console.log(result);
  }).timeout(60000);

  it('should read a save file (mortal, empire, turn 0, v1.7.2)', async () => {
    const saveFileLocation = "http://localhost:9876/base/test/savegames/mortal_empire_turn_0_v1_7_2.save";
    const arrayBuffer = await fetch(saveFileLocation).then(response => response.arrayBuffer());

    const result = TwsParser.read(arrayBuffer);

    expect(result.data.length).to.equal(4);

    const regionsArray = result.data
      .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
      .find(n => n.name === "CAMPAIGN_ENV").data
      .find(n => n.name === "CAMPAIGN_MODEL").data
      .find(n => n.name === "WORLD").data
      .find(n => n.name === "REGION_MANAGER").data
      .find(n => n.name === "REGIONS_ARRAY").data;

    expect(regionsArray.length).to.equal(323 + 1);
  }).timeout(60000);

  it('should read a save file (mortal, empire, turn 0, v1.7.0)', async () => {
    const saveFileLocation = "http://localhost:9876/base/test/savegames/mortal_empire_turn_0_v1_7_0.save";
    const arrayBuffer = await fetch(saveFileLocation).then(response => response.arrayBuffer());

    const result = TwsParser.read(arrayBuffer);

    expect(result.data.length).to.equal(4);

    const regionsArray = result.data
      .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
      .find(n => n.name === "CAMPAIGN_ENV").data
      .find(n => n.name === "CAMPAIGN_MODEL").data
      .find(n => n.name === "WORLD").data
      .find(n => n.name === "REGION_MANAGER").data
      .find(n => n.name === "REGIONS_ARRAY").data;

    expect(regionsArray.length).to.equal(323 + 1);
  }).timeout(60000);

  it('should read a save file (mortal, empire, turn 0, v1.6.0)', async () => {
    const saveFileLocation = "http://localhost:9876/base/test/savegames/mortal_empire_turn_0_v1_6_0.save";
    const arrayBuffer = await fetch(saveFileLocation).then(response => response.arrayBuffer());

    const result = TwsParser.read(arrayBuffer);

    expect(result.data.length).to.equal(4);

    const regionsArray = result.data
      .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
      .find(n => n.name === "CAMPAIGN_ENV").data
      .find(n => n.name === "CAMPAIGN_MODEL").data
      .find(n => n.name === "WORLD").data
      .find(n => n.name === "REGION_MANAGER").data
      .find(n => n.name === "REGIONS_ARRAY").data;

    expect(regionsArray.length).to.equal(309 + 1);
  }).timeout(60000);

  it('should read a save file (mortal, empire, turn 0, v1.5.1)', async () => {
    const saveFileLocation = "http://localhost:9876/base/test/savegames/mortal_empire_turn_0_v1_5_1.save";
    const arrayBuffer = await fetch(saveFileLocation).then(response => response.arrayBuffer());

    const result = TwsParser.read(arrayBuffer);

    expect(result.data.length).to.equal(4);

    const regionsArray = result.data
      .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
      .find(n => n.name === "CAMPAIGN_ENV").data
      .find(n => n.name === "CAMPAIGN_MODEL").data
      .find(n => n.name === "WORLD").data
      .find(n => n.name === "REGION_MANAGER").data
      .find(n => n.name === "REGIONS_ARRAY").data;

    expect(regionsArray.length).to.equal(301 + 1);
  }).timeout(60000);

  it('should read a save file (vortex, lothern, turn 0, v1.5.1)', async () => {
    const saveFileLocation = "http://localhost:9876/base/test/savegames/vortex_lothern_turn_0_v1_5_1.save";
    const arrayBuffer = await fetch(saveFileLocation).then(response => response.arrayBuffer());

    const result = TwsParser.read(arrayBuffer);

    expect(result.data.length).to.equal(4);

    const regionsArray = result.data
      .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
      .find(n => n.name === "CAMPAIGN_ENV").data
      .find(n => n.name === "CAMPAIGN_MODEL").data
      .find(n => n.name === "WORLD").data
      .find(n => n.name === "REGION_MANAGER").data
      .find(n => n.name === "REGIONS_ARRAY").data;

    expect(regionsArray.length).to.equal(225 + 1);
  }).timeout(60000);

});
