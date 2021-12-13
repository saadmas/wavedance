import { DrawerScreenProps } from '@react-navigation/drawer';
import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import useDebounce from '../../hooks/useDebounce';
import { Path } from '../../routing/paths';
import NextScreenButton from '../NextScreenButton/NextScreenButton';
import { PromptDrawerParamList, SelectedPrompt } from '../PromptsManager/PromptsManager';
import { ResponseStatus } from '../../state/enums/responseStatus';
import { fetchSpotifyItems } from '../../spotify/utils';
import { SpotifyItem } from '../../spotify/types';
import SpotifyList from '../SpotifyList/SpotifyList';

interface SpotifySearchProps extends DrawerScreenProps<PromptDrawerParamList, Path.SpotifySearch> {}

const SpotifySearch = ({ route, navigation }: SpotifySearchProps) => {
  const { prompt } = route.params.selectedPrompt;
  const [searchText, setSearchText] = React.useState<string>(route.params.searchText ?? '');
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);
  const [listItems, setListItems] = React.useState<SpotifyItem[]>([]);

  const debouncedSearchText = useDebounce(searchText, 200);

  const handleError = () => {
    setResponseStatus(ResponseStatus.Error);
  };

  React.useEffect(() => {
    setSearchText(route.params.searchText ?? '');
  }, [route.params.searchText]);

  React.useEffect(() => {
    if (!debouncedSearchText) {
      setResponseStatus(ResponseStatus.Success);
      return;
    }

    const performSpotifySearch = async () => {
      const matchedItems = await fetchSpotifyItems(debouncedSearchText, prompt, handleError);
      setListItems(matchedItems);
      setResponseStatus(ResponseStatus.Success);
    };

    performSpotifySearch();
  }, [debouncedSearchText]);

  const onItemSelect = ({ id, type }: SpotifyItem) => {
    const spotifyUri = `https://open.spotify.com/embed/${type}/${id}`;
    const { selectedPrompt } = route.params;

    const selectedPromptWithSpotifyUri: SelectedPrompt = {
      ...selectedPrompt,
      answer: {
        answer: selectedPrompt.answer?.answer ?? '',
        spotifyUri,
      },
    };

    navigation.navigate(Path.PromptInput, { selectedPrompt: selectedPromptWithSpotifyUri });
  };

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Searchbar
          onChangeText={setSearchText}
          value={searchText}
          style={{ marginRight: 10, borderRadius: 5, fontSize: 10, height: 35, flex: 1 }}
          inputStyle={{ fontSize: 12 }}
        />
      </View>
      {searchText ? (
        <SpotifyList listItems={listItems} responseStatus={responseStatus} onItemSelect={onItemSelect} />
      ) : null}
    </>
  );
};

export default SpotifySearch;
